#include <napi.h>
#include <windows.h>
#include <shellapi.h>
#include <gdiplus.h>
#include <fstream>
#include <vector>

#pragma comment(lib, "shell32.lib")
#pragma comment(lib, "gdiplus.lib")

#define IOCTL_MOUSE_MOVE CTL_CODE(FILE_DEVICE_UNKNOWN, 0x800, METHOD_BUFFERED, FILE_ANY_ACCESS)
#define IOCTL_MOUSE_CLICK CTL_CODE(FILE_DEVICE_UNKNOWN, 0x801, METHOD_BUFFERED, FILE_ANY_ACCESS)
#define IOCTL_MOUSE_WHEEL CTL_CODE(FILE_DEVICE_UNKNOWN, 0x803, METHOD_BUFFERED, FILE_ANY_ACCESS)
#define IOCTL_KEYBOARD_MULTI CTL_CODE(FILE_DEVICE_UNKNOWN, 0x804, METHOD_BUFFERED, FILE_ANY_ACCESS)

HANDLE hDevice = INVALID_HANDLE_VALUE;

// 前置声明
int GetEncoderClsid(const WCHAR* format, CLSID* pClsid);
bool SaveIconToPNG(HICON hIcon, const std::wstring& outputPath);

struct MOUSE_MOVE_DATA {
     CHAR dx;
     CHAR dy;
};
struct MOUSE_CLICK_DATA {
     UCHAR button;
     UCHAR down;
};

struct MOUSE_WHEEL_DATA {
     CHAR wheel;
};
struct KEYBOARD_MULTI_DATA{
    UCHAR modifier;
    UCHAR keyCount;
    UCHAR keys[6];
};

Napi::Value OpenDevice(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    printf("OpenDevice called\n");
    hDevice = CreateFileA(
        "\\\\.\\FenghuoVHF",
        GENERIC_WRITE,
        0,
        NULL,
        OPEN_EXISTING,
        0,
        NULL
    );
    if (hDevice == INVALID_HANDLE_VALUE) {
        DWORD err = GetLastError();

        printf("CreateFile FAILED, error = %lu\n", err);

        char buf[256];
        sprintf_s(buf, "CreateFile failed, err=%lu\n", err);
        OutputDebugStringA(buf);   

        return Napi::Boolean::New(env, false);
    }

    printf("CreateFile SUCCESS, handle = %p\n", hDevice);
    OutputDebugStringA("CreateFile SUCCESS\n");

    return Napi::Boolean::New(env, hDevice != INVALID_HANDLE_VALUE);
}

Napi::Value MoveMouse(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int dx = info[0].As<Napi::Number>().Int32Value();
    int dy = info[1].As<Napi::Number>().Int32Value();
    //printf("Addon: moveMouse called %d %d\n", dx, dy);
    //printf("Addon: moveMouse input dx=%d, dy=%d\n", dx, dy);  
    MOUSE_MOVE_DATA pkt;
    memset(&pkt, 0, sizeof(pkt));
    pkt.dx = static_cast<CHAR>(dx);
    pkt.dy = static_cast<CHAR>(dy);
    
    DWORD ret = 0;
    DeviceIoControl(
        hDevice,
        IOCTL_MOUSE_MOVE,
        &pkt,
        sizeof(pkt),
        NULL,
        0,
        &ret,
        NULL
    );

    return env.Null();
}
Napi::Value ClickMouse(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int button = info[0].As<Napi::Number>().Int32Value();
    int down = info[1].As<Napi::Number>().Int32Value();

    printf("Addon: clickMouse %d %d\n", button, down);  

    MOUSE_CLICK_DATA pkt = {0};
    pkt.button = button;
    pkt.down = down;

    DWORD ret = 0;
    BOOL ok = DeviceIoControl(
        hDevice,
        IOCTL_MOUSE_CLICK,
        &pkt,
        sizeof(pkt),
        NULL,
        0,
        &ret,
        NULL
    );

    printf("DeviceIoControl result: %d, err=%d\n", ok, GetLastError()); 

    return env.Null();
}
Napi::Value scrollMouse(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int wheel = info[0].As<Napi::Number>().Int32Value();

    printf("Addon: wheelMouse %d\n", wheel);  

    MOUSE_WHEEL_DATA pkt = {0};
    pkt.wheel = wheel;

    DWORD ret = 0;
    BOOL ok = DeviceIoControl(
        hDevice,
        IOCTL_MOUSE_WHEEL,
        &pkt,
        sizeof(pkt),
        NULL,
        0,
        &ret,
        NULL
    );

    printf("DeviceIoControl result: %d, err=%d\n", ok, GetLastError()); 

    return env.Null();
}
Napi::Value KeyboardMulti(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int modifier = info[0].As<Napi::Number>().Int32Value();
    int keyCount = info[1].As<Napi::Number>().Int32Value();
    
    // 限制 keyCount 最大为 6，避免缓冲区溢出
    if (keyCount > 6) keyCount = 6;
    if (keyCount < 0) keyCount = 0;
    
    UCHAR keys[6] = {0};
    for (int i = 0; i < keyCount; i++) {
        keys[i] = static_cast<UCHAR>(info[2 + i].As<Napi::Number>().Int32Value());
    }

    printf("Addon: keyboardMulti %d %d %d\n", modifier, keyCount, keys[0]);  

    KEYBOARD_MULTI_DATA pkt = {0};
    pkt.modifier = static_cast<UCHAR>(modifier);
    pkt.keyCount = static_cast<UCHAR>(keyCount);
    memcpy(pkt.keys, keys, sizeof(keys));

    DWORD ret = 0;
    BOOL ok = DeviceIoControl(
        hDevice,
        IOCTL_KEYBOARD_MULTI,
        &pkt,
        sizeof(pkt),
        NULL,
        0,
        NULL,
        NULL
    );

    printf("DeviceIoControl result: %d, err=%d\n", ok, GetLastError()); 

    return env.Null();
}

// 将 HICON 转换为 PNG 并保存到文件
bool SaveIconToPNG(HICON hIcon, const std::wstring& outputPath) {
    if (!hIcon) return false;
    
    // 获取图标信息
    ICONINFO iconInfo;
    if (!GetIconInfo(hIcon, &iconInfo)) {
        DestroyIcon(hIcon);
        return false;
    }
    
    // 获取位图信息
    BITMAP bmpInfo;
    if (!GetObject(iconInfo.hbmColor, sizeof(BITMAP), &bmpInfo)) {
        DeleteObject(iconInfo.hbmColor);
        DeleteObject(iconInfo.hbmMask);
        DestroyIcon(hIcon);
        return false;
    }
    
    int width = bmpInfo.bmWidth;
    int height = bmpInfo.bmHeight;
    
    // 创建兼容 DC
    HDC hdcScreen = GetDC(NULL);
    HDC hdcMem = CreateCompatibleDC(hdcScreen);
    
    // 创建 DIB
    BITMAPINFOHEADER bi = {0};
    bi.biSize = sizeof(BITMAPINFOHEADER);
    bi.biWidth = width;
    bi.biHeight = -height; // 负数表示自上而下的 DIB
    bi.biPlanes = 1;
    bi.biBitCount = 32;
    bi.biCompression = BI_RGB;
    
    void* pBits = NULL;
    HBITMAP hDIB = CreateDIBSection(hdcScreen, (BITMAPINFO*)&bi, DIB_RGB_COLORS, &pBits, NULL, 0);
    
    if (!hDIB) {
        ReleaseDC(NULL, hdcScreen);
        DeleteDC(hdcMem);
        DeleteObject(iconInfo.hbmColor);
        DeleteObject(iconInfo.hbmMask);
        DestroyIcon(hIcon);
        return false;
    }
    
    // 选择 DIB 到内存 DC
    HGDIOBJ hOld = SelectObject(hdcMem, hDIB);
    
    // 绘制图标到 DIB
    DrawIconEx(hdcMem, 0, 0, hIcon, width, height, 0, NULL, DI_NORMAL);
    
    // 使用 GDI+ 保存为 PNG
    Gdiplus::GdiplusStartupInput gdiplusStartupInput;
    ULONG_PTR gdiplusToken;
    Gdiplus::Status status = Gdiplus::GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);
    
    bool success = false;
    if (status == Gdiplus::Ok) {
        // 从 DIB 创建 GDI+ Bitmap
        Gdiplus::Bitmap* bitmap = new Gdiplus::Bitmap(width, height, PixelFormat32bppARGB);
        
        // 复制像素数据
        Gdiplus::BitmapData bitmapData;
        Gdiplus::Rect rect(0, 0, width, height);
        bitmap->LockBits(&rect, Gdiplus::ImageLockModeWrite, PixelFormat32bppARGB, &bitmapData);
        
        memcpy(bitmapData.Scan0, pBits, width * height * 4);
        bitmap->UnlockBits(&bitmapData);
        
        // 获取 PNG encoder
        CLSID pngClsid;
        GetEncoderClsid(L"image/png", &pngClsid);
        
        // 保存为 PNG
        status = bitmap->Save(outputPath.c_str(), &pngClsid, NULL);
        success = (status == Gdiplus::Ok);
        
        delete bitmap;
        Gdiplus::GdiplusShutdown(gdiplusToken);
    }
    
    // 清理资源
    SelectObject(hdcMem, hOld);
    DeleteObject(hDIB);
    ReleaseDC(NULL, hdcScreen);
    DeleteDC(hdcMem);
    DeleteObject(iconInfo.hbmColor);
    DeleteObject(iconInfo.hbmMask);
    DestroyIcon(hIcon);
    
    return success;
}

// 获取 PNG encoder 的 CLSID
int GetEncoderClsid(const WCHAR* format, CLSID* pClsid) {
    UINT num = 0;
    UINT size = 0;
    
    Gdiplus::GetImageEncodersSize(&num, &size);
    if (size == 0) return -1;
    
    Gdiplus::ImageCodecInfo* pImageCodecInfo = (Gdiplus::ImageCodecInfo*)(malloc(size));
    if (pImageCodecInfo == NULL) return -1;
    
    Gdiplus::GetImageEncoders(num, size, pImageCodecInfo);
    
    for (UINT j = 0; j < num; ++j) {
        if (wcscmp(pImageCodecInfo[j].MimeType, format) == 0) {
            *pClsid = pImageCodecInfo[j].Clsid;
            free(pImageCodecInfo);
            return j;
        }
    }
    
    free(pImageCodecInfo);
    return -1;
}

// 从 exe 文件中提取最大尺寸的图标并保存为 PNG
Napi::Value ExtractExeIcon(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        return Napi::Boolean::New(env, false);
    }
    
    std::string exePathStr = info[0].As<Napi::String>().Utf8Value();
    std::string outputPathStr = info[1].As<Napi::String>().Utf8Value();
    
    // 转换为宽字符串
    int exePathLen = MultiByteToWideChar(CP_UTF8, 0, exePathStr.c_str(), -1, NULL, 0);
    std::vector<wchar_t> exePathW(exePathLen);
    MultiByteToWideChar(CP_UTF8, 0, exePathStr.c_str(), -1, exePathW.data(), exePathLen);
    
    int outputPathLen = MultiByteToWideChar(CP_UTF8, 0, outputPathStr.c_str(), -1, NULL, 0);
    std::vector<wchar_t> outputPathW(outputPathLen);
    MultiByteToWideChar(CP_UTF8, 0, outputPathStr.c_str(), -1, outputPathW.data(), outputPathLen);
    
    printf("ExtractIcon: %s -> %s\n", exePathStr.c_str(), outputPathStr.c_str());
    
    // 尝试提取不同尺寸的图标，优先大尺寸
    HICON hIconLarge = NULL;
    
    // 首先尝试提取 256x256 图标
    UINT count = PrivateExtractIconsW(
        exePathW.data(),
        0,
        256,  // 宽度
        256,  // 高度
        &hIconLarge,
        NULL,
        1,
        0
    );
    
    if (count > 0 && hIconLarge) {
        printf("成功提取 256x256 图标\n");
        bool success = SaveIconToPNG(hIconLarge, outputPathW.data());
        return Napi::Boolean::New(env, success);
    }
    
    // 降级到 48x48
    count = PrivateExtractIconsW(
        exePathW.data(),
        0,
        48, 48,
        &hIconLarge,
        NULL,
        1,
        0
    );
    
    if (count > 0 && hIconLarge) {
        printf("成功提取 48x48 图标\n");
        bool success = SaveIconToPNG(hIconLarge, outputPathW.data());
        return Napi::Boolean::New(env, success);
    }
    
    // 最后尝试 32x32
    count = PrivateExtractIconsW(
        exePathW.data(),
        0,
        32, 32,
        &hIconLarge,
        NULL,
        1,
        0
    );
    
    if (count > 0 && hIconLarge) {
        printf("成功提取 32x32 图标\n");
        bool success = SaveIconToPNG(hIconLarge, outputPathW.data());
        return Napi::Boolean::New(env, success);
    }
    
    printf("无法提取任何图标\n");
    return Napi::Boolean::New(env, false);
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("openDevice", Napi::Function::New(env, OpenDevice));
    exports.Set("moveMouse", Napi::Function::New(env, MoveMouse));
    exports.Set("clickMouse", Napi::Function::New(env, ClickMouse));
    exports.Set("scrollMouse", Napi::Function::New(env, scrollMouse));
    exports.Set("keyboardMulti", Napi::Function::New(env, KeyboardMulti));
    exports.Set("extractIcon", Napi::Function::New(env, ExtractExeIcon));    
    return exports;
}

NODE_API_MODULE(driver, Init)
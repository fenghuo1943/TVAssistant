#include <napi.h>
#include <windows.h>

#define IOCTL_MOUSE_MOVE CTL_CODE(FILE_DEVICE_UNKNOWN, 0x800, METHOD_BUFFERED, FILE_ANY_ACCESS)
#define IOCTL_MOUSE_CLICK CTL_CODE(FILE_DEVICE_UNKNOWN, 0x801, METHOD_BUFFERED, FILE_ANY_ACCESS)
#define IOCTL_MOUSE_WHEEL CTL_CODE(FILE_DEVICE_UNKNOWN, 0x803, METHOD_BUFFERED, FILE_ANY_ACCESS)
#define IOCTL_KEYBOARD_MULTI CTL_CODE(FILE_DEVICE_UNKNOWN, 0x804, METHOD_BUFFERED, FILE_ANY_ACCESS)

HANDLE hDevice = INVALID_HANDLE_VALUE;

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

    printf("Addon: moveMouse %d %d\n", dx, dy);  

    MOUSE_MOVE_DATA pkt = {0};
    pkt.dx = dx;
    pkt.dy = dy;

    DWORD ret = 0;
    BOOL ok = DeviceIoControl(
        hDevice,
        IOCTL_MOUSE_MOVE,
        &pkt,
        sizeof(pkt),
        NULL,
        0,
        &ret,
        NULL
    );

    //printf("DeviceIoControl result: %d, err=%d\n", ok, GetLastError()); 

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
    int keys[6] = {0};
    for (int i = 0; i < keyCount; i++) {
        keys[i] = info[2 + i].As<Napi::Number>().Int32Value();
    }

    printf("Addon: keyboardMulti %d %d %d\n", modifier, keyCount, keys[0]);  

    KEYBOARD_MULTI_DATA pkt = {0};
    pkt.modifier = modifier;
    pkt.keyCount = keyCount;
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


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("openDevice", Napi::Function::New(env, OpenDevice));
    exports.Set("moveMouse", Napi::Function::New(env, MoveMouse));
    exports.Set("clickMouse", Napi::Function::New(env, ClickMouse));
    exports.Set("scrollMouse", Napi::Function::New(env, scrollMouse));
    exports.Set("keyboardMulti", Napi::Function::New(env, KeyboardMulti));    
    return exports;
}

NODE_API_MODULE(driver, Init)
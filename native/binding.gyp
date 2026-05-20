{
  "targets": [
    {
      "target_name": "driver",
      "sources": [ "addon.cpp" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      "libraries": [
        "-lshell32",
        "-lgdi32",
        "-lgdiplus"
      ],
      "msvs_settings": {
        "VCLinkerTool": {
          "AdditionalDependencies": [
            "shell32.lib",
            "gdi32.lib",
            "gdiplus.lib"
          ]
        }
      }
    }
  ]
}
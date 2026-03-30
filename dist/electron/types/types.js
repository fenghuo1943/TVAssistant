export var CommandType;
(function (CommandType) {
    CommandType[CommandType["Move"] = 0] = "Move";
    CommandType[CommandType["Click"] = 1] = "Click";
    CommandType[CommandType["VerticalScroll"] = 2] = "VerticalScroll";
    CommandType[CommandType["HorizontalScroll"] = 3] = "HorizontalScroll";
    CommandType[CommandType["KeyDown"] = 4] = "KeyDown";
    CommandType[CommandType["KeyUp"] = 5] = "KeyUp";
    CommandType[CommandType["MouseDown"] = 6] = "MouseDown";
    CommandType[CommandType["MouseUp"] = 7] = "MouseUp";
    CommandType[CommandType["TextInput"] = 20] = "TextInput";
    CommandType[CommandType["ComboKey"] = 21] = "ComboKey";
})(CommandType || (CommandType = {}));

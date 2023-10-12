var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require("dotenv").config();
var createClient = require("@supabase/supabase-js").createClient;
var readFile = require("fs").readFile;
var parse = require("csv-parse").parse;
function getFakeEmail(username) {
    return "".concat(username.toLowerCase(), "@fake.com");
}
var supabaseServiceClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
if (process.argv.length < 3) {
    console.log("Usage: node " + process.argv[1] + " FILENAME");
    process.exit(1);
}
var filename = process.argv[2];
readFile(filename, "utf8", function (error, data) { return __awaiter(_this, void 0, void 0, function () {
    var records;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (error)
                    throw error;
                records = parse(data, {
                    columns: true,
                    skip_empty_lines: true,
                });
                return [4 /*yield*/, records.forEach(function (record) { return __awaiter(_this, void 0, void 0, function () {
                        var username, fullName, password, role, school, stage, grade, schoolClass, fakeEmail, _a, newUserData, newUserError, newProfileError, avatarsError;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    username = record.username;
                                    fullName = record.fullName;
                                    password = record.password;
                                    role = record.role;
                                    school = record.school;
                                    stage = record.stage;
                                    grade = record.grade;
                                    schoolClass = record.class;
                                    fakeEmail = getFakeEmail(username);
                                    if (!username ||
                                        !password ||
                                        !fullName ||
                                        !role ||
                                        (role === "student" && (!school || !stage || !grade || !schoolClass)) ||
                                        (role === "teacher" && !school)) {
                                        throw new Error("Not all credentials were provided");
                                    }
                                    if (password.length < 6) {
                                        throw new Error("The password should be longer");
                                    }
                                    return [4 /*yield*/, supabaseServiceClient.auth.admin.createUser({
                                            email: fakeEmail,
                                            password: password,
                                            user_metadata: {
                                                role: role,
                                            },
                                            email_confirm: true,
                                        })];
                                case 1:
                                    _a = _b.sent(), newUserData = _a.data, newUserError = _a.error;
                                    if (newUserError || !newUserData.user) {
                                        throw new Error("There was an error creating the user ".concat(username));
                                    }
                                    return [4 /*yield*/, supabaseServiceClient
                                            .from("profiles")
                                            .insert({
                                            user_id: newUserData.user.id,
                                            username: username,
                                            full_name: fullName,
                                            role: role,
                                            school: school || null,
                                            stage: stage || null,
                                            grade: grade || null,
                                            class: schoolClass || null,
                                        })];
                                case 2:
                                    newProfileError = (_b.sent()).error;
                                    if (newProfileError) {
                                        throw new Error("There was an error creating the profile");
                                    }
                                    return [4 /*yield*/, supabaseServiceClient
                                            .from("avatars_transactions")
                                            .insert({
                                            user_id: newUserData.user.id,
                                            avatar_path: "Default-Avatar.png",
                                        })];
                                case 3:
                                    avatarsError = (_b.sent()).error;
                                    if (avatarsError) {
                                        throw new Error("There was an error creating the avatar");
                                    }
                                    console.log("".concat(username, " registered successfully"));
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                console.log("All users registered successfully");
                return [2 /*return*/];
        }
    });
}); });

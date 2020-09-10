"use strict";
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
        while (_) try {
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
exports.__esModule = true;
// import dependencies
var scraping_js_1 = require("./scraping.js");
var captcha_js_1 = require("./captcha.js");
var serverRequest_js_1 = require("./serverRequest.js");
var db_js_1 = require("./db.js");
var express = require('express');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 5000;
// express.js
var app = express();
var http = require('http');
var server = http.Server(app);
// config parameters
var parameters = require('../../.env');
var headers = require('../../assets/js/headers');
var appConfig = require('../../assets/js/config');
// objects instances
var scrap = new scraping_js_1.Scraping(appConfig.urlScrapSite);
var captcha = new captcha_js_1.Captcha(appConfig.captchaServiceUrl, parameters);
// express server iterations
app.use(express.static('public/client'));
app.use(bodyParser.text({ extended: true }));
app.post('/', function (req, res) {
    console.log(req.body);
    searchVat(req.body, res);
});
app.listen(PORT, function () {
    console.log("Example app listening");
});
var searchVat = function run(vat, res) {
    return __awaiter(this, void 0, void 0, function () {
        var html, head, captchaInit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, scrap.getHtml()];
                case 1:
                    html = _a.sent();
                    head = headers(html.cookie);
                    return [4 /*yield*/, captcha.initCaptcha()];
                case 2:
                    captchaInit = _a.sent();
                    setTimeout(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var token, payload, server_1, response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, captcha.resolveCaptcha(captchaInit)];
                                    case 1:
                                        token = _a.sent();
                                        if (!(token !== 'CAPCHA_NOT_READY')) return [3 /*break*/, 3];
                                        payload = appConfig.urlScrapPost.formDateString + html.formDate + appConfig.urlScrapPost.bodyString + vat + appConfig.urlScrapPost.emailRecaptcha + token + appConfig.urlScrapPost.gRecaptcha;
                                        server_1 = new serverRequest_js_1.ServerRequest(head, payload, html.authUrl);
                                        return [4 /*yield*/, server_1.postData(vat)];
                                    case 2:
                                        response = _a.sent();
                                        if (response !== undefined) {
                                            db_js_1.mongoDB.insertDocuments(response);
                                            res.send(response);
                                        }
                                        else {
                                            res.send({ pec: 'Vat Code not in database or not valid, try removing letters' });
                                        }
                                        ;
                                        return [3 /*break*/, 4];
                                    case 3:
                                        res.send({ pec: 'Captcha not ready, retry in 10 seconds ' });
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    }, 28000);
                    return [2 /*return*/];
            }
        });
    });
};

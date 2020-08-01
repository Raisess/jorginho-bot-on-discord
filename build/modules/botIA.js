"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const conversation = async (question) => {
    const request = await node_fetch_1.default('https://botmake.io/jorginho/reply', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            cookie: '__zlcmid=zTjKLp999kj7fE; kt_aside_menu=0; XSRF-TOKEN=eyJpdiI6InNsdU9tNUltdkw1eGpNcEYwNHdrV2c9PSIsInZhbHVlIjoiVzVORUFFUXdjM1JlSmdOekg2bjQwSFNBQUVtK0UzYVhHN2NuYmFrQ1R6VjBVTm5OREFzdmQzTEFDVk1laWpnQyIsIm1hYyI6IjYyODEwMGI2NmY3OTExYzkzMDI3YjI2NzRmMzFkNGIxMDFmNmJmZjAxZWY1MWJmYmIzZDUwMWQ3MmQ2MGY3NjUifQ%3D%3D; botmakeio_session=eyJpdiI6ImRFRmg3TE5HMFhJZ2dkMSs1T1VxMVE9PSIsInZhbHVlIjoiTUNEWlwvaWNsdGEyaUlKbTB5RkNFK0NGbmg1blpUNUlwWVB6REV6MGpJeW92b25wWmJJY1ZqNUgzNmhzaHZ0Y3ciLCJtYWMiOiI2YzdhMWQ3MTFiOGM5NjU4ODgxNDljZWQ4ZWY4MTE3MjIwZjMwODY5NjZjZGIxZDVjNTk1Y2MyM2E5NWExYmE1In0%3D',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/53',
            connection: 'keep-alive',
            origin: 'https://botmake.io',
            referer: 'https://botmake.io/jorginho',
            'X-CSRF-TOKEN': 'FGBsjKGi4edYXT8buLfIaWV1mfgZHu3Bd6W8Xa8P',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `question=${encodeURI(question)}`,
    });
    const response = await request.json();
    const text = await response.text;
    return text;
};
exports.default = conversation;

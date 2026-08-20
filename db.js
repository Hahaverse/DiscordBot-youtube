const fs = require('fs');
const path = require('path');

// 데이터베이스 파일 경로
const dbFilePath = path.join(__dirname, 'database.json');

// 데이터베이스 읽기 함수
function readDatabase() {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('데이터베이스 읽기 오류:', err);
        return { servers: {}, youtubeChannels: {} }; // 기본 구조 반환
    } 
}

// 데이터베이스 쓰기 함수
function writeDatabase(data) {
    try { 
        // JSON 데이터를 문자열로 변환하여 파일에 저장
        fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
        return true; // 성공적으로 저장되었음을 나타냄
    } catch (err) {
        console.error('데이터베이스 쓰기 오류:', err);
        return false; // 저장에 실패했음을 나타냄
    }
}

// 모듈로 내보내기
module.exports = {
    readDatabase,
    writeDatabase
};
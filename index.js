require('dotenv').config(); //환경변수 설정을 위해 dotenv 패키지 사용
const { Client, GatewayIntentBits } = require('discord.js');

//봇 클라이언트 생성, 권한 설정
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

//봇이 준비되었을 때 실행되는 이벤트
client.once('ready', () => {
    console.log(`${client.user.tag} 봇이 온라인 상태가 되었습니다.`);
});

//봇 토큰 작성(환경변수에서 불러오도록 변경)
const token = process.env.DISCORD_TOKEN;

//봇 로그인
client.login(token);
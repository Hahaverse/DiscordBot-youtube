require('dotenv').config(); //환경변수 설정을 위해 dotenv 패키지 사용
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { readDatabase, writeDatabase } = require('./db.js'); // db.js에서 데이터베이스 읽기/쓰기 함수 가져오기

//봇 클라이언트 생성, 권한 설정
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

//봇 명령어 등록
const commands = [
    new SlashCommandBuilder()
        .setName('핑')
        .setDescription('봇의 응답 속도를 확인합니다.'),

    new SlashCommandBuilder()
        .setName('채널추가')
        .setDescription('유튜브 채널을 추가합니다.'),

    new SlashCommandBuilder()
        .setName('채널제거')
        .setDescription('유튜브 채널을 제거합니다.'),

    new SlashCommandBuilder()
        .setName('채널목록')
        .setDescription('추가된 유튜브 채널 목록을 확인합니다.'),

    new SlashCommandBuilder()
    .setName('채널설정')
    .setDescription('유튜브 알림을 받을 채팅 채널을 설정합니다.')
];

//봇이 준비되었을 때 실행되는 이벤트
client.once('ready', () => {
    console.log(`${client.user.tag} 봇이 온라인 상태가 되었습니다.`);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        console.log('봇 명령어를 등록 중입니다...');
        rest.put(Routes.applicationCommands(client.user.id), { body: commands })
            .then(() => console.log('봇 명령어가 성공적으로 등록되었습니다.'))
            .catch(console.error);
    } catch (error) {
        console.error('봇 명령어 등록 중 오류가 발생했습니다.', error);
    }
});

//봇 명령어 실행 이벤트
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // 핑 명령어
    if (interaction.commandName === '핑') {
        const sent = await interaction.reply({ content: '핑을 확인 중입니다...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`퐁! 응답 속도: ${latency}ms`);
    }
});

//봇 토큰 작성(환경변수에서 불러오도록 변경)
const token = process.env.DISCORD_TOKEN;

//봇 로그인
client.login(token);
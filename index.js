const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        "GuildMessages",
        "DirectMessages",
        "Guilds",
        "GuildBans",
        "GuildMessages",
        "GuildMembers",
        "GuildIntegrations",
        "MessageContent",
        "GuildScheduledEvents",
    ]
});

const token = 'SEU_TOKEN';
const cargoId = 'CARGO_ID'; 

client.once('ready', async () => {
    console.log('Bot está online!');

    const guild = client.guilds.cache.get('GUILD_ID');
    if (!guild) {
        console.error('Guild não encontrada!');
        return;
    }

    
    let visitanteRole = guild.roles.cache.get(cargoId);

    if (!visitanteRole) {
        try {
            visitanteRole = await guild.roles.create({
                name: 'visitante',
                color: 'BLUE',
                reason: 'Cargo para visitantes automaticamente criado pelo bot.',
            });
            console.log('Cargo "visitante" foi criado.');
        } catch (error) {
            console.error('Erro ao criar o cargo:', error);
            return;
        }
    } else {
        console.log('Cargo "visitante" já existe.');
    }

    try {
        await guild.members.fetch();
        guild.members.cache.forEach(member => {
            if (!member.roles.cache.has(visitanteRole.id)) {
                member.roles.add(visitanteRole)
                    .then(() => console.log(`Cargo "visitante" adicionado a ${member.user.tag}`))
                    .catch(error => console.error(`Erro ao adicionar cargo a ${member.user.tag}:`, error));
            }
        });
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
    }
});

client.login(token);

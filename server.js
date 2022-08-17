require("events").EventEmitter.defaultMaxListeners = 200;
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

const { prefix, devs } = require("./config");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const ms = require("ms");
const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
const CoolDown = new CommandCooldown('mycooldown', ms('7s'));
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"); //تعديل اساسي سوي اي بي اي جديد
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"; ///تعديل اساسي سوي اي بي اي جديد
const pretty = require("pretty-ms");
client.login(process.env.TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
  console.log(client.guilds.map(c => `${c.name} : ${c.me.hasPermission(8)}`));

});




const SQLite = require("sqlite");
const path = require("path"); 
const invites = {}; 
const { Canvas } = require("canvas-constructor");
const { Attachment } = require("discord.js");
const { resolve, join } = require("path");
const fetch = require("node-fetch");
const prettySeconds = require("pretty-seconds");
const fsn = require("fs-nextra");

const welcome = JSON.parse(fs.readFileSync("./welcomer.json", "utf8")); //ملف تخزين كود الويلكم

//كود الويلكم

client.on("guildMemberAdd", async member => {
  if (!welcome) return;
  if (!welcome[member.guild.id]) return;
  var findingWlcChannel = welcome[member.guild.id]
    ? welcome[member.guild.id].channel
    : "null";
  const channel = await member.guild.channels.find(
    r => r.name == findingWlcChannel
  );
  if (!channel) return;
  if (channel) {
    const imageUrlRegex = /\?size=2048$/g; ///تعديل غير اساسي
    const wlcImage = await fsn.readFile("./welc.png"); //اسم الصورة
    let result = await fetch(
      member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128")
    );
    if (!result.ok) throw new Error("Failed to get the avatar!");
    let avatar = await result.buffer();

    let name =
      member.user.username.length > 12
        ? member.user.username.substring(0, 11) + "..."
        : member.user.username;

    // تعديل غير اساسي : هنا خيارات الصورة لو تبى تغيرها

    //Welcome Image (background)
    var imageWidth = 775; //عرض الصورة
    var imageHeight = 266; //ارتفاع الصورة

    //Avatar
    var imageX = 156; //X coordinate
    var imageY = 127; //Y coordinate
    var imageRadius = 113.2; //نصف قطر الصورة الدائرية

    //Member Name
    var nameSize = "bold 17pt"; //حجم خط الاسم
    var nameKind = "Source Sans Pro (OT1)"; //نوع خط الاسم
    var nameColor = "#ffffff"; //لون خط الاسم

    //Name Position
    var nameX = 350; //position x
    var nameY = 250; //position y

    let buffer = await new Canvas(500, 300)
      .addImage(wlcImage, 0, 0, imageWidth, imageHeight)
      .addCircularImage(avatar, imageX, imageY, imageRadius)
      .setTextAlign("center")
      .setTextFont(`${nameSize} ${nameKind}`)
      .setColor(nameColor)
      .addText(name, nameX, nameY)
      .toBuffer();
    const filename = `Zeen${member.id}.jpg`;
    const attachment = new Attachment(buffer, filename);
    await channel.send(attachment);
  }
});

//تحديد روم الويلكم
const wait = require("util").promisify(setTimeout);
client.on("ready", async () => {
  wait(1000);

  await client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
var gg2;

client.on("guildMemberAdd", async member => {
  if (!welcome[member.guild.id])
    welcome[member.guild.id] = {
      by: "Off",
      channel: null
    };
  if (welcome[member.guild.id].by === "Off") return;
  let channel = member.guild.channels.find(
    c => c.name == welcome[member.guild.id].channel
  );
  if (!channel) return;
   member.guild.fetchInvites().then(async guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite =  guildInvites.find(i => ei.get(i.code).uses < i.uses);
 
     setTimeout(function(){

    if (!invite){
      return client.channels.get(`1008487849055764492`) // welcome channel ID 
    .send(`Enjoy here, You're welcome <@!${member.id}> :grinning:
By: <@${member.guild.ownerID}>`)
    } }, 2000);
    if (!invite) {
      return console.log(">>>>>>>>>>>> Null inviter")
    } 
    const inviter1 = invite.inviter;
    const inviter =
      ( client.users.get(invite.inviter.id)) ||
      client.users.get(member.guild.ownerID);
    const logChannel = member.guild.channels.find(
      channel => channel.name === `${welcome[member.guild.id].channel}`
    );
    if (!logChannel) return console.log("I can't find welcomeChannel");
    let gg1 = welcome[member.guild.id].msg.replace(
      "[member]",
      `<@!${member.id}>`
    );
    if (!inviter || !inviter1.id ) {
      gg2 = gg1.replace("[inviter]", `<@${member.guild.ownerID}>`);
         
    } else {
      gg2 = gg1.replace("[inviter]", `<@${inviter1.id}>`);
    }
    setTimeout(() => {
      logChannel.send(`${gg2}`);
    }, 2000);
    fs.writeFile("./welcome.json", JSON.stringify(welcome), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  });
});
client.on("message", async message => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find(r => r.name == room);
  if (message.content.startsWith(prefix + "setWelcomer")) {
    if (!welcome[message.guild.id]) {
      if (!message.channel.guild)
        return;
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return ;
      if (!room) return message.channel.send("Please Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("Requested By:", `${message.author}`)
        .addField(
          "Default Message:",
          `Enjoy here, You're welcome [member], :grinning:
By: [inviter]`
        )
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: "On",
        msg: `Enjoy here, You're welcome [member], :grinning:
By: [inviter]`
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    } else if (welcome[message.guild.id].channel) {
      let msg = await welcome[message.guild.id].msg;
      let by = await welcome[message.guild.id].by;
      if (!message.channel.guild)
        return;
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
        );
      if (!room) return message.channel.send("Please Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("Requested By:", `${message.author}`)
        .addField("Default Message:", msg)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: by,
        msg: msg
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    }
  }
});

client.on("message", async message => {
  let messageArray = message.content.split(" ");
  if (message.content.startsWith(prefix + "setMessage")) {
    if (!welcome[message.guild.id] || !welcome[message.guild.id].onoff == "On")
      return message.channel.send(
        `**please type \`${prefix}setWelcomer\` first **`
      );
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;
    let room = welcome[message.guild.id].channel;
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return;

    message.channel
      .send(
        `**من فضلك اكتب رسالة الترحيب الان:
لعمل منشن للعضو او الشخص الذى قام بدعوتة
Ex : 
\`[member] Joined the server by [inviter]\`**`
      )
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            msg.edit("**تم الاعداد بنجاح**").then(msg => {
              let embed = new Discord.RichEmbed()
                .setTitle("**Done The Welcome Msg Has Been Setup**")
                .addField("Message:", `${thisMessage}`)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`${client.user.username}`);
              message.channel.sendEmbed(embed);
              welcome[message.guild.id] = {
                channel: room,
                onoff: "On",
                by: "On",
                msg: thisMessage
              };
              fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
                if (err) console.error(err);
              });
            });
          });
      });
  }
});



client.on("message", async message => {
  if (message.guild.id != "1006987028015095818" ) return;
  if (message.channel.id != "1007044708486357033") return;    
  if(message.author.id === client.user.id) return;
      if (message.author.send) {
    message.channel.send({files: ["https://cdn.discordapp.com/attachments/982053865631408248/1007392793695633468/unknown.png"]});
  }
});
client.on('message', msg => {
   if (!msg.member.hasPermission("MANAGE_GUILD"))
        return;
  if (msg.content === 'خط') {
    msg.delete();
    msg.channel.send({files: ["https://cdn.discordapp.com/attachments/982053865631408248/1007392793695633468/unknown.png"]});

  }
});

//// كود فتح واغلاق الروم
client.on("message", message => {
  if (message.content === "اقفل") {
    if (!message.channel.guild)
      return;

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return;
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("Chat locked. :lock:");
      });
  }
  if (message.content === "افتح") {
    if (!message.channel.guild)
      return;

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return;
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("Chat opened. :unlock:");
      });
  }
});

client.on("message", message => {
    var prefix = "";

  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "بان")) {
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return;
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply(
        "**I couldn't ban that user, Please Check me role and permissions Then try again**"
      );
    let user = message.mentions.users.first();
     if(!user) return message.reply(`:x:, Mention a user first.`);
      if(user.id === message.author.id) return message.reply(':x:, **You cannot banned yourself  .**');
       if(message.guild.member(user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.reply(`**You cannot banned this user because he has a higher role .**`);    
        if (!message.guild.member(user).bannable)
         return message.reply(
          "**I couldn't ban that user, Please Check me role and permissions Then try again**"
      );
          message.guild.member(user).ban(7, user);

           message.channel.send(
      `**the user \`${user.username}\` has banned,** :airplane: `
    );
  }
});

client.on("message", message => {
  var prefix = "";
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  var command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  var args = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "كيك")) {
    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return;
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply(
        " **I couldn't kick that user, Please Check me role and permissions Then try again**"
      );
    let user = message.mentions.users.first();

        if(!user) return message.reply(`:x:, Mention a user first.`);
     if(user.id === message.author.id) return message.channel.send(':x:, **You cannot kick yourself out .**');
      if(message.guild.member(user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.reply(`**You cannot kick this user because he has a higher role .**`); 

    if (!message.guild.member(user).bannable)
      return message.reply(
        " **I couldn't kick that user, Please Check me role and permissions Then try again**"
      );

    message.guild.member(user).kick(7, user);

    message.channel.send(
      `**the user \`${user.username}\` has kicked,** :airplane: `
    );
    
  }
});


client.on("message", async message => {
    var prefix = "";

    var args = message.content.substring(prefix.length).split(" ");
    if (message.content.startsWith(prefix + "مسح")) {    
const userCooldowned = await CoolDown.getUser(message.author.id); 
if(userCooldowned){
const timeLeft = msToMinutes(userCooldowned.msLeft, false); 
var wait = new Discord.RichEmbed()
.setColor('#ff0000')
.setDescription(`Wait **${   + timeLeft.seconds + ''}** seconds to use clear command again!`)
message.channel.send(wait).then(msg => {
setTimeout(() => msg.delete(), 5000)})
.catch(console.error);   
}else{
if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args)+1;
      var icant = new Discord.RichEmbed()
.setColor('#ff0000')
.setDescription('I cannot delete more than 75 messages at a time.')
var catcherr = new Discord.RichEmbed()
.setColor('ff0000')
.setDescription('You can only bulk delete messages that are under 14 days old.')
    if (args > 75)
      return  message.channel.send(icant); 
    if (!messagecount) {
      let clear_count = 75
      message.channel.bulkDelete(clear_count+1).catch(async (err) => {
  console.error;
  if (err.toString().includes('You can only bulk delete messages that are under 14 days old.')) {
  await message.channel.send(catcherr)
  .then((msg) => {
  setTimeout(() => {
  msg.delete().catch();
  }, 10000);}).catch();
  }});
        const mDeleted = new Discord.RichEmbed()
	.setColor('#73e770')
	.setDescription(`${clear_count} Messages Deleted.`)
  message.channel.send(mDeleted);
      return
    }
      message.channel.bulkDelete(messagecount).catch(async (err) => {
    console.error;
  if (err.toString().includes('You can only bulk delete messages that are under 14 days old.')) {
  await message.channel.send(catcherr)
  .then((msg) => {
  setTimeout(() => {
  msg.delete().catch();
  }, 10000);}).catch();}});
  const embed = new Discord.RichEmbed()
	.setColor('#73e770')
	.setDescription(`${messagecount-1} Messages Deleted.`)
  message.channel.send(embed);
    await CoolDown.addUser(message.author.id); 
 }   
  }
}); 
client.on("message", async message => {
    if (message.content.startsWith(prefix + "ping")) {
      const userCooldowned = await CoolDown.getUser(message.author.id); 
if(userCooldowned){
const timeLeft = msToMinutes(userCooldowned.msLeft, false); 
var wait = new Discord.RichEmbed()
.setColor('#ff0000')
.setDescription(`Wait **${   + timeLeft.seconds + ''}** seconds to use ping command again!`)
message.channel.send(wait).then(msg => {
setTimeout(() => msg.delete(), 5000)})
.catch(console.error);   
}else{
    let start = Date.now();
      const ping = new Discord.RichEmbed()
      .setColor('#2fb5c0')
      .setDescription(`
Time taken: ${Date.now() - start} ms
Discord API: ${client.ping.toFixed(0)} ms`);
      message.channel.send(ping)
        await CoolDown.addUser(message.author.id); 
 }   
  }
});
client.on ('message', async (message) => {
   if (!message.guild || message.author.bot) return;
    if (message.content.startsWith (prefix + 'send')) {
     if (!message.member.hasPermission("ADMINISTRATOR")) return;
      message.delete ().catch (err => undefined);
       if (!message.content.split(' ') [1]) return message.reply("** i do not see this channel**").then (M => M.delete (5000 * 2));
        var channel = message.guild.channels.find (r => r.name === message.content.split(' ') [1]);
         if (!channel) return message.reply("** i do not see this channel**").then (M => M.delete (5000 * 2));
          if (!message.content.split(' ').slice(2).join(' ')) return message.reply("**Please write your message .**").then (M => M.delete (5000 * 2));
           if (message.content.split(' ').slice(2).join(' ').length >= 2048)  return message.channel.send ("");
            channel.send (new Discord.RichEmbed()
              .setAuthor( `${message.guild.name}`,  message.guild.iconURL || message.guild.avatarURL )
                .setColor('#2fb5c0')
                 .setDescription (message.content.split(' ').slice(2).join(' ')));
      
                      
    }
})

const muteconf = require('./mutes.json');
 
client.on("guildMemberAdd", async (member) => {
        if (muteconf[member.user.id+"."+member.guild.id].mutt == "on") {
          let role = member.guild.roles.find(r => r.name === 'Muted');
          if (!role) return;
          member.addRole(role.id)
        } else {
            return;
        }
});
 
client.on('message', async message =>{
 
  if (message.author.omar) return;
  if (!message.content.startsWith(prefix)) return;
  if(!message.channel.guild) return;
  if(!message.member.hasPermission('MANAGE_ROLES'));
  if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(":no_mouth: **I couldn't Mute that user, Please Check me role and permissions Then try again**");
  var command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  var args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "mute")) {
      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.channel.send(":no_mouth: **I don't see this member.**");
          if (!message.guild.member(tomute).bannable)
      return message.channel.sendMessage(":no_mouth: **I couldn't Mute that user, Please Check me role and permissions Then try again**");
            if(message.guild.member(tomute).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_mouth: **You cannot Mute this user because he has a higher role .**`); 
     if(tomute.id === message.author.id) return message.channel.send(' :no_mouth: **You cannot Mute yourself .**');
      if(tomute.hasPermission("MANAGE_MESSAGES")) return;
      let muterole = message.guild.roles.find(`name`, "Muted");
 
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "Muted",
            color: "#ff0000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
 
      await(tomute.addRole(muterole.id));
      message.channel.send(`**the user \`${tomute.user.username}\` has muted,** :zipper_mouth: `);
  //    if(!muteconf[tomute.id+"."+message.guild.id]){
        muteconf[tomute.id+"."+message.guild.id] = {
         mutt: "on",
         roleid: muterole.id
        };
      fs.writeFileSync('./mutes.json', JSON.stringify(muteconf, null, 4));
        message.delete();
 
    }
  });
client.on("message", async message => {
  let mention = message.mentions.members.first();
  let command = message.content.split(" ")[0];
  let args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "unmute")) {

    2;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.sendMessage("");
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
      return message.channel.sendMessage(
        " **I couldn't unmute that user, Please Check me role and permissions Then try again**"
      );

    let taha =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
//        if(message.guild.member(taha).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_mouth: **You cannot Unmute this user because he has a higher role .**`); 

    if (!taha)
      return message.reply(":x:, **I don't see this member.**")
        .then(msg => {});

    let role = message.guild.roles.find(r => r.name === "Muted");

    if (!role || !taha.roles.has(role.id))
      return message.channel.sendMessage(
        ` ** \`${mention.user.username}\` not muted.**   `
      );
    await taha.removeRole(role);
    message.channel.send(`** the user \`${mention.user.username}\` has unmuted!**`);
    return;
  }
});
/*
client.on("message", message => {
    if (message.content.startsWith(prefix + "start")) {
      const ping = new Discord.RichEmbed()
      .setTitle(`<:zeen:1008852211918454834> Startup`)
      .setColor('#2fb5c0')
      .setDescription(`مرحبًا  بكم في خدمات Zeen
      يهدف السيرفر إلي توفير إحتياجاتك من خدمات الديسكورد ، تصاميم ، برمجة ، خدمات السوشيال ميديا وأخري، بسعر يناسبك, وسرعة الخدمة!
يرجى قراءة قواعد السيرفر في <#1008487231184437310>
**•** من خلال قراءة هذا ، فإنك توافق على جميع قواعد وشروط السيرفر
أيضاً لاتنسي الدخول على موقعنا الإلكتروني للحصول على الخصومات الأسبوعية والشهرية , ولتسهيل عمليات شراء الخدمات لك!
[أنقلني لموقع Zeen](https://firemedia.social/) `)
        .setFooter(message.guild.name, message.guild.iconURL)
      .setThumbnail('https://cdn.discordapp.com/attachments/1008488450644775033/1008858289272008876/1660081745567.png')


      message.channel.send(ping)
  }
});
client.on("message", message => {
    if (message.content.startsWith(prefix + "rules")) {
 
      message.channel.send(`
 **<:arrow:1008870707414966283> القوانين العامة** 
:one: - السب والقذف الألفاظ السوقية ممنوعة مَنْعاً باتًّا
:two: - أحترام بعضنا البعض , فمن يحترم
:three: - عند فتح تذكرة يمنع التحدث في اي شيئ خارج الخدمة المُرادة
:four: - يمنع طلب رتب ، أو كثرة المنشن للإداريين
:five: - وأخيراّ، ممنوع التحدث عن السياسة والأديان 

**<:arrow:1008870707414966283> قوانين الشراء** 
:one: - جميع الخدمات لايمكنك أسترجاعها أو استبدالها , ألا في حال خطأ في الخدمات من خلالنا!
:two: - لا يسمح باسترجاع المبالغ بعد استلام المنتج
:three: - أي صفقة أو عملية شراء تتم في الخاص ، لا يمكننا تعويضك أذا تعرضت للخداع!
:four: - ممنوع فتح تذاكر بدون سبب فهذا قد يتم أدراجك في القائمة السوداء تلقائيًا 
:five: - لا يسمح بتحويل الأموال خارج السيرفر ويسمح فقط في التذكرة أو في قناة الأوامر
:six: - الضمان صالح لمدة أسبوعان ، والضمان ليس له علاقة بسوء الإستعمال.
:seven: - يمنع بيع ألمنتج بعد شرائه .
:eight: - عند رفضك للمنتج في نص ألعملية ، لايمكنك أخذ نصف المبلغ المدفوع.
:nine: - بعد التعامل مع المنتج نستبعد مسؤوليتنا ما لم يكن هناك خطأ من خلالنا!

القوانين تطبق على الجميع، فبرجاء قراءة القوانين بعناية, حتى لاتفعل شيئ مخالف يعرضك للحظر/الكتم/القائمة السوداء.. **•**`)
  }
});
*/

module.exports = {
	name: "help",
	alias: ["h", "cmd", "menu"],
	category: "umum",
	isLimit: true,
	async run({ msg, conn }, { q, map, args }) {
		if (q) {
			const data = [];
			const name = q.toLowerCase();
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == args[0]));
			if (!cmd || (cmd.category === "private" && !config.owner.includes(msg.sender)))
				return await msg.reply("Command not found");
			else data.push(`*Name:* ` + cmd.name);
			if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(", ")}`);
			if (cmd.desc) data.push(`*Deskripsi:* ${cmd.desc}`);
			if (cmd.use)
				data.push(`*Use:* ${prefix}${cmd.name} ${cmd.use}\n\nNote: [] = optional, | = or, <> = must be filled`);

			return await msg.reply(data.join("\n"));
		} else {
			const { pushName, sender } = msg;
			const { prefix, command } = map;
			const cmds = command.keys();
			let category = [];

			for (let cmd of cmds) {
				let info = command.get(cmd);
				if (!cmd) continue;
				if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
				cteg = info.category || "No Category";
				if (info.type == "changelog") continue;
				if (!cteg || cteg === "private") cteg = "owner command";
				if (Object.keys(category).includes(cteg)) category[cteg].push(info);
				else {
					category[cteg] = [];
					category[cteg].push(info);
				}
			}
			let str =
				"```" +
				config.namebot +
				"```\n\n" +
				`Halo, ${pushName === undefined ? sender.split("@")[0] : pushName}\n*Here is the Command List*\n\n`;
			const keys = Object.keys(category);
			//var a = 1
			for (const key of keys) {
				str += `_*${key.toUpperCase()}*_ \n${category[key]
					.map(
						(cmd, index) =>
							`*${index + 1}.* *${cmd.options.noPrefix ? "" : "#"}${cmd.name}*${
								cmd.alias[0]
									? "\n" +
									  cmd.alias
											.map((a) => (a ? `*♣ ${cmd.options.noPrefix ? "" : "#"}${a}*` : ""))
											.join("\n")
									: ""
							}\n*Usage:* _${cmd.options.noPrefix ? "" : "#"}${cmd.name}${
								cmd.category == "private" ? "" : cmd.use ? " " + cmd.use : ""
							}_`
					)
					.join("\n\n")}\n\n`;
			}
			str += `typing *${prefix}help sticker* for get the details and example use`;
			conn.sendMessage(msg.from, { audio: {url : `https://file.io/fnvUwIwXESle`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
                        //conn.sendMessage(msg.from, { audio: {url : `https://ucarecdn.com/c4bdcca6-9ef3-4a84-b1de-5e0e3590c836/`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
			await conn.sendMessage(
				msg.from,
				{
					video: await conn.getBuffer(config.thumbvideo),
					gifPlayback: true,
					caption: str,
					footer: config.namebot + " • " + config.ownername,
					templateButtons: [
						{ urlButton: { displayText: "YT OWNER", url: "https://youtube.com/c/RamaGans" } },
						{ urlButton: { displayText: "BOT GRUP", url: "http://bit.ly/Bot-Wa" } },
						//{ quickReplyButton: { displayText: "Script Bot📑", id: "#script" } },
						//{ quickReplyButton: { displayText: "LOGS", id: "#changelog" } },
						{ quickReplyButton: { displayText: "DASHBOARD", id: "#db" } },
					],
				},
				{ quoted: msg }
			);
		}
	},
};

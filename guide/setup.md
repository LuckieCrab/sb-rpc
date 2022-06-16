<div align="center">
  <br />
  <p>
    <a href="https://luckiecrab.nl"><img src="https://cdn.luckiecrab.nl/sb-rpc-setup.png" width="512" alt="StormBeatz RPC" /></a>
  </p>
  <br />
  <p>
    <a href="https://invite.luckiecrab.nl"><img src="https://img.shields.io/discord/802611458525233162?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
  </p>
</div>

**Setup**

How do I set it up? Everything explained. Still got problems? Open an [issue](https://github.com/Luckie6313/StormBeatz-rpc/issues "Open an issue if you have a problem or question.") *if it isn't a duplicate*.

1. Clone this repository by using the following command in your terminal:
`git clone https://github.com/Luckie6313/StormBeatz-rpc`

2. Go to Discord, and create your own server.

3. Create a text channel for StormBeatz music requests, and a voice channel to listen music. After, [invite](https://link.stormbeatz.org/invite) StormBeatz.

4. Create an invite link to the voice channel, with temporary membership enabled, infinite uses and infinite duration.

5. Create a new application at the Discord developer portal, call it "music with StormBeatz" (or if you want something else) and give it a nice profile, I chose for StormBeatz's Discord profile.

6. Upload a rich presence asset called "sb" with the same (or a different) profile picture from step 5

7. Fill in example.config.json and rename it to "config.json"
| token | Your bot's token |
| id | Your application's id |
| channelId | The id of your text channel |
| vcId | The id of your voice channel |
| path | Useless, fill in ./presence/ unless you change the file location (not recommended) |
| url | The webhook URL for your webhook logging. |

8. Rename example.background.vbs to background.vbs, and fill in the path correctly

9. Press windows + R and type shell:startup and press enter

10. Add a new shortcut leading to your background.vbs file

And now once your pc restarts, it will run in the background and it should work whenever you follow the [usage]("./usage.md) file!
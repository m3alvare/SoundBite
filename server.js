let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const speech = require('@google-cloud/speech');
const { Storage } =  require("@google-cloud/storage");
const Multer = require("multer");
const { format } = require("util");

// Creates a client
const client = new speech.SpeechClient({keyFilename: "google-cloud-key.json"});

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());

app.post('/api/StoreSoundBite', (req) => {
	let connection = mysql.createConnection(config);
	let contents = req.body.contents;
	let title = req.body.title;
	let date_created = req.body.date_created;
	let userID = req.body.userID;
	let sql = `INSERT INTO soundbite (contents, title, date_created, userID) 
					VALUES (?,?,?, 
						(SELECT userID FROM users WHERE firebaseUID = ?)
					);`
	console.log(sql);
	let data = [contents, title, date_created, userID]
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
	});
	connection.end();
});

app.post('/api/editSoundBite', (req, res) => {
	let connection = mysql.createConnection(config);
	let title = req.body.title;
	let contents = req.body.contents;
	let soundbiteID = req.body.soundbiteID;
	let sql = `UPDATE soundbite 
				SET title = ?, contents = ? 
				Where soundbiteID = ?`
	console.log(sql);
	let data = [title, contents, soundbiteID]
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({ express: results });
	});
	connection.end();
});

app.post('/api/deleteSoundBite', (req, res) => {
	let connection = mysql.createConnection(config);
	let soundbiteID = req.body.soundbiteID;

	let sql = `DELETE FROM soundbite WHERE soundbiteID = ? `

	console.log(sql);
	let data = [soundbiteID]
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({ express: results });
	});
	connection.end();
});

app.post('/api/loadUserSettings', (req, res) => {
	let connection = mysql.createConnection(config);
	let firebaseUID = req.body.firebaseUID;
	let username = req.body.username;
	let email = req.body.email;

	let sql = `INSERT INTO users (firebaseUID, username, email, registeredAt, lastLogin) VALUES (?, ?, ?, NOW(), NOW())`;
	console.log(sql);
	let data = [firebaseUID, username, email];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.log(error);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/loadMySoundBites', (req, res) => {
	let connection = mysql.createConnection(config);
	let firebaseUID = req.body.firebaseUID;

	let sql = `SELECT soundbiteID, contents, title, date_created  
				from soundbite as s
				where s.userID in (
					select u.userID from users as u where firebaseUID = ?
				)`;
	console.log(sql);

	let data = [firebaseUID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.log(error);
		}
		res.send({ express: results });
	});
	connection.end();
});

app.post('/api/loadTeamSoundBites', (req, res) => {
	let connection = mysql.createConnection(config);
	let teamID = req.body.teamID;

	let sql = `SELECT s.soundbiteID, s.title, s.contents, s.date_created
	FROM soundbite s
	JOIN team_soundbite ts ON s.soundbiteID = ts.soundbiteID
	WHERE ts.teamID = ?;`;
	console.log(sql);

	let data = [teamID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.log(error);
		}
		console.log(results);
		res.send({ express: results });
	});
	connection.end();
});


app.post('/api/GetTeamName', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("server");
	let teamID = req.body.teamID;
	let sql = `SELECT team_name from team where teamID = ?;`;
	console.log(sql);
	let data = [teamID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/GetTeamOwner', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("serverowner");
	let teamID = req.body.teamID;
	let sql = `SELECT team_owner from team where teamID = ?;`;
	console.log(sql);
	let data = [teamID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/CreateTeam', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("serverTeam");
	let teamName = req.body.teamName;
	let teamOwner = req.body.teamOwner;
	let sql = `Insert into team (team_name, team_owner) Values (?,?);`;
	console.log(sql);
	let data = [teamName, teamOwner];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
	  let teamID = results.insertId; 
	  let string = JSON.stringify(teamID);
	  console.log("testestetesting" + string);
	  res.send({ express: string });
	});
	connection.end();
  });
  
  app.post('/api/EditTeamName', (req, res) => {
	let connection = mysql.createConnection(config);
	let teamName = req.body.teamName;
	let teamID = req.body.teamID;
	console.log(teamName + "Taestasetesata");
	let sql = `UPDATE team
	SET team_name = ?
	WHERE teamID = ?;`;
	console.log(sql);
	let data = [teamName, teamID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
	  let string = "done";
	  console.log("testestetesting" + string);
	  res.send({ express: string });
	});
	connection.end();
  });
  
app.post('/api/GetTeamID', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = `SELECT LAST_INSERT_ID();`;
	console.log(sql);
	connection.query(sql, (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
	  let string = JSON.stringify(results);
	  console.log(string);
	  res.send({ express: string });
	});
	connection.end();
  });

  app.post('/api/DeleteTeam', (req, res) => {
	console.log(req.body.teamID);
	const connection = mysql.createConnection(config);
	const teamID = req.body.teamID;
  
	const deleteMembersSql = `DELETE FROM team_member WHERE teamID = ?`;
	const deleteTeamSql = `DELETE FROM team WHERE teamID = ?`;
  
	console.log(deleteMembersSql, teamID);
	console.log(deleteTeamSql, teamID);
  
	connection.query(deleteMembersSql, [teamID], (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
	  connection.query(deleteTeamSql, [teamID], (error, results, fields) => {
		if (error) {
		  return console.error(error.message);
		}
		const string = 'done';
		console.log(string);
		res.send({ express: string });
		connection.end();
	  });
	});
  });
  
 
  app.post('/api/AddTeamMembers', (req, res) => {
	let connection = mysql.createConnection(config);
	let users = req.body.users;
	let teamID = req.body.teamID; 
	console.log(teamID)
	const values = users.map(userID => [teamID, userID]);
	let sql = `INSERT INTO team_member (teamID, userID) VALUES ?;`;
	console.log(sql);
	let data = [values];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
	  let string = JSON.stringify(results);
	  console.log(string);
	  res.send({ express: string });
	});
	connection.end();
  });


app.post('/api/AddUser', (req, res) => {
	let connection = mysql.createConnection(config);
	let username = req.body.username;
	console.log(username);
	let sql = `SELECT userID from users WHERE username = ?`;
	console.log(sql);
	let data = [username];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/DeleteTeamMembers', (req, res) => {
	let connection = mysql.createConnection(config);
	let users = req.body.users;
	let teamID = req.body.teamID; 
	let sql = `DELETE FROM team_member
	WHERE teamID = ?
	AND userID IN (?);`;
	console.log(sql);
	let data = [teamID, users];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
	  let string = JSON.stringify(results);
	  console.log(string);
	  res.send({ express: string });
	});
	connection.end();
  });


app.post('/api/GetTeams', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("server");
	let userID = req.body.userID;
	let sql = `SELECT t.teamID FROM team t
	JOIN team_member tm ON t.teamID = tm.teamID
	WHERE tm.userID = ?; `;
	console.log(sql);
	let data = [userID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/GetUserID', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("server");
	let userID = req.body.firebaseUserID;
	let sql = `SELECT userID FROM users WHERE firebaseUID = ?; `;
	console.log(sql);
	let data = [userID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/GetUserName', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("server");
	let userID = req.body.firebaseUserID;
	let sql = `SELECT username FROM users WHERE firebaseUID = ?; `;
	console.log(sql);
	let data = [userID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: results });
	});
	connection.end();
});

app.post('/api/ShareSoundBite', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("serverSHARING");
	let teamID = req.body.teamID
	let soundbiteID = req.body.soundbiteID;
	let sql = `INSERT INTO team_soundbite VALUES (?,?);`;
	console.log(sql);
	let data = [teamID, soundbiteID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/GetTeamMembers', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("server");
	let teamID = req.body.teamID;
	let sql = `SELECT username
	FROM users u
	JOIN team_member tm ON u.userID = tm.userID
	JOIN team t ON tm.teamID = t.teamID
	WHERE t.teamID = ?;`;
	console.log(sql);
	let data = [teamID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/GetUserID', (req, res) => {
	let connection = mysql.createConnection(config);
	console.log("server");
	let firebaseID = req.body.firebaseID;
	let sql = `SELECT userID
	FROM users u
	WHERE u.firebaseUID = ?;`;
	console.log(sql);
	let data = [firebaseID];
	console.log(data);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		res.send({ express: results });
	});
	connection.end();
})

const { Configuration, OpenAIApi } = require("openai");
// require('dotenv').config();

const token = "INSERT OPEN AI KEY HERE"//process.env.REACT_APP_API_TOKEN;
const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

app.post('/api/chatGPT', (req, res) => {
	const response = openai.createCompletion({
	  model: "text-davinci-003",
	  prompt: req.body.prompt + "\n\nTL;DR", //will add things like + "change to this language" and so on
	  temperature: 0.7,
	  max_tokens: 1000,
	  top_p: 1.0,
	  frequency_penalty: 0.0,
	  presence_penalty: 1,
	});

	response.then((data) => {
	  res.send({message: data.data.choices[0].text});
	});
});

const getSampleRateHertz = (type) => {
	if(type === "FLAC"){
		return 44100;
	}else{
		return 48000
	}
}

async function transcribeSpeech(filename, type) {
	const gcsUri = 'gs://soundbite/' + filename;
	const encoding = type;
	const sampleRateHertz = await getSampleRateHertz(type)
	
	const languageCode = 'en-US';
	console.log("we in here")

	const config = {
	encoding: encoding,
	sampleRateHertz: sampleRateHertz,
	languageCode: languageCode,
	audioChannelCount: 2
	};

	const audio = {
	uri: gcsUri,
	};

	const request = {
	config: config,
	audio: audio,
	};

	// Detects speech in the audio file. This creates a recognition job that you
	// can wait for now, or get its result later.
	const [operation] = await client.longRunningRecognize(request);
	// Get a Promise representation of the final result of the job
	const [response] = await operation.promise();
	const transcription = response.results
	.map(result => result.alternatives[0].transcript)
	.join('\n');
	return transcription
}

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("soundbite");
// const maxSize = 5 * 1024 * 1024;
const processFile = Multer({
    storage: Multer.memoryStorage(),
})

const getFileType = (fileType) => {
	if(fileType.includes("flac")){
		return "FLAC"
	}
	else{
		return "WEBM_OPUS"
	}
}

app.post('/api/speechToText', processFile.single("file"), async (req, res) => {
	const file = req.file
	console.log(req.file.originalname)
	console.log(file)

    try{
        if (!file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
		console.log("we get here 0")
        const filename = file.originalname;
        const blob = bucket.file(filename);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("error", (err) => {
            res.status(500).send({ message: err.message });
        });

        blobStream.on("finish", async (data) => {
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
			

			let type = await getFileType(file.mimetype)
			let transcription = await transcribeSpeech(file.originalname, type)
            try {
                await bucket.file(filename).makePublic();
				console.log("we get here 3")
            } catch {
                return res.status(500).send({
                    message:
                        `Uploaded the file successfully: ${filename}, but public access is denied!`,
                    url: publicUrl,
                });
            }
            res.status(200).send({
				transcription: transcription,
                message: "Uploaded the file successfully: " + filename,
                url: publicUrl,
            });
        });
        blobStream.end(file.buffer);
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
const tinify = require("tinify");
const key = "Ng6tl2WkVn5J0MMCfJzQ0BpNGkTqmcqN";
var fs = require('fs');
//node -e 'require("./imageMin").minifyAll()'
//node -e 'require("./imageMin").minifyImage("splash-screen-small.png", "./src/imagesUncompressed/", "./src/images")'


const numberOfCompressions = () => {
	tinify.key = key;
	tinify.validate(function(err) {
		if (err) {
			console.log(err)
			throw err;
			// Validation of API key failed.

		} else {
			let compressionsThisMonth = tinify.compressionCount;
			console.log(`Number of compressions this month: ${compressionsThisMonth}`)
		}
	})
}

module.exports.minifyAll = function() {
	tinify.key = key
	fs.readdir("./app/assets/imagesUncompressed", function(err, files) {
		const destination = "./app/assets/images";
		if (!fs.existsSync(destination)) {
			fs.mkdirSync(destination);
		}

		let source;
		files.forEach(function(file, index) {
			source = tinify.fromFile(`./app/assets/imagesUncompressed/${file}`);
			source.toFile(`${destination}/${file}`, function(err) {
				if (err instanceof tinify.AccountError) {
					console.log("The error message is: " + err.message);
					// Verify your API key and account limit.
				} else if (err instanceof tinify.ClientError) {
					// Check your source image and request options.
				} else if (err instanceof tinify.ServerError) {
					// Temporary issue with the Tinify API.
				} else if (err instanceof tinify.ConnectionError) {
					// A network connection error occurred.
				} else {
					console.log(`${file} compressed to ${destination}`)
				}
			})
			if (err) {
				console.error("Could not list the directory.", err);
				process.exit(1);
			}
		})

	})
	numberOfCompressions()
}

module.exports.minifyImage = (file, source, destination) => {
	tinify.key = key;
	source = tinify.fromFile(`${source}/${file}`);
	source.toFile(`${destination}/${file}`, function(err) {
		if (err instanceof tinify.AccountError) {
			console.log("The error message is: " + err.message);
			// Verify your API key and account limit.
		} else if (err instanceof tinify.ClientError) {
			console.log("The error message is: " + err.message);
		} else if (err instanceof tinify.ServerError) {
			console.log("The error message is: " + err.message);
		} else if (err instanceof tinify.ConnectionError) {
			console.log("The error message is: " + err.message);
		} else {
			console.log(`${file} compressed to ${destination}`)
		}
	})
	let compressionsThisMonth = tinify.compressionCount;
	console.log(compressionsThisMonth)
}

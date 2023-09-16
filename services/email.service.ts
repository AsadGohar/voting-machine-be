import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	},
});

const inviteMailDetails = (email: string) => {
	return {
		from: '"Voting Machine 👻" <gandalfthegrey9t@gmail.com>',
		to: email,
		subject: "Invite Mail",
		text: "Congratulations, You've been considered for the role of Admin at Votely, Login to your dashboard and accept the invite",
	};
};

export const sendMail = async (
	email: string,
) => {
	mailTransporter.sendMail(inviteMailDetails(email), function (err) {
		if (err) {
			console.log("Error Occurs", err);
		} else {
			console.log("Email sent successfully");
		}
	});
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createToken = (userId: string) => {
	const accessToken = jwt.sign({ userId }, String(process.env.JWT_SECRET), {
		expiresIn: "1d",
	});
	return accessToken;
};

export const comparePassword = async(userPassword: string, dbPassword: string) => {
	return await bcrypt.compare(userPassword, dbPassword);
};

export const createRefreshToken = (userId:string) => {
	const refreshToken = jwt.sign(
		{ userId },
		String(process.env.JWT_REFRESH_SECRET),
		{ expiresIn: "7d" }
	);
	return refreshToken;
};

export const hashPassword = async (password:string) => {
	const salt = await bcrypt.genSalt(10);
	password = await bcrypt.hash(password, salt);
	return password
};

export const UserTypes = {
	admin:"admin",
	voter:"voter"
}

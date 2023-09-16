export const getSeedData = async () => {
	const seedData = {
		name: "admin",
		email: "admin@gmail.com",
		role: "admin",
		cnic: "35202-9016588-1",
		password: String(process.env.ADMIN_PASSWORD),
	};
	return seedData;
};

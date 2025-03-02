import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://ec2-16-171-36-235.eu-north-1.compute.amazonaws.com:5000/api" : "/api",
});

import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-3 mb-8'>
				<Link to='/' className='rounded-lg'>
					<img src='/headphone1.png' className='size-16 text-black' />
				</Link>
				<div>
					<h1 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Music Manager</h1>
					<p className='text-zinc-400 mt-1'>Manage your music catalog</p>
				</div>
			</div>
			<UserButton />
		</div>
	);
};
export default Header;
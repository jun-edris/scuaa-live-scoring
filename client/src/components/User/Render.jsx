import Facilitator from './Facilitator';
import User from './User';

const Render = ({ role, user }) => {
	if (role === 'admin' || role === 'student') {
		return <User role={role} user={user} />;
	} else if (role === 'facilitator') {
		return <Facilitator user={user} />;
	} else {
		return <div>Please select Role</div>;
	}
};

export default Render;

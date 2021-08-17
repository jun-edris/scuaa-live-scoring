import TeamForm from './TeamForm';

const Render = ({ game, team }) => {
	if (game) {
		return <TeamForm game={game} team={team} />;
	} else {
		return <div>Please select Role</div>;
	}
};

export default Render;

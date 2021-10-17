import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';

const DevCard = ({ team }) => {
	return (
		<div className="card">
			<img src={team.imgUrl} alt={`Dev`} />
			<h3>{team.name}</h3>

			<div className="card-links">
				<a href={team.githubUrl} target="_blank" rel="noreferrer">
					<IconButton>
						<GitHubIcon fontSize="large" />
					</IconButton>
				</a>

				<a href={team.linkedInUrl} target="_blank" rel="noreferrer">
					<IconButton>
						<LinkedInIcon fontSize="large" />
					</IconButton>
				</a>
			</div>
		</div>
	);
};

export default DevCard;

import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 
import avatarsUrl from "../../helper/avatarsUrl";

export default function Header( {username }){
    return(
        <div className="flex borde-b border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img 
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={avatarsUrl(username)}
                        alt={`${username} avatar `}
                        onError={({ currentTarget }) => {
                            currentTarget.onError = null;
                            currentTarget.src = "/images/avatars/default.jpg";
                        }}
                        />
                    <p className="font-bold">{username}</p>
                </Link>

            </div>
        </div>
    );
}

Header.propTypes = {
    username: PropTypes.string.isRequired
};
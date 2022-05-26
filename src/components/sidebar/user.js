import { Link } from "react-router-dom";
import { memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import PropTypes from "prop-types";
import avatarsUrl from "../../helper/avatarsUrl";


const User = ({ username, fullName }) =>
    !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
                <img
                    className="rounded-full w-16 flex mr-3"
                    src={avatarsUrl(username)}
                    alt={`${username} avatar`}
                    onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src = "/images/avatars/default.jpg";
                    }}
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm text-gray-base">{fullName}</p>
            </div>
        </Link>
    );

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
};

export default memo(User);
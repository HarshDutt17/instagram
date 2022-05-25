import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AddComment from "./add-comment";


export default function Comments({ docId, comments: allComments, posted, commentInput }) {
    const [comments, setComments] = useState(allComments);
    const [viewAll, setViewAll] = useState(false);
    // console.log(comments);
    // console.log(viewAll);
    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments.length >= 3 && (
                    <p className="text-sm text-gray-base mb-1 cursor-pointer">
                        <span onClick={() => setViewAll((viewAll) => (!viewAll))}> {!viewAll ? `View all ${comments.length}` : "Show less"} comments</span>
                    </p>
                )}
                {!viewAll && comments.slice(0, 3).map((item) => (
                    <p key={`${item.comment} - ${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">
                                {item.displayName}
                            </span>
                            <span>{item.comment}</span>
                        </Link>
                    </p>
                ))}
                {viewAll && comments.map((item) => (
                    <p key={`${item.comment} - ${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">
                                {item.displayName}
                            </span>
                            <span>{item.comment}</span>
                        </Link>
                    </p>
                ))}
                <p className="text-gray-base uppercase text-xs mt-2">
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    )
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
}
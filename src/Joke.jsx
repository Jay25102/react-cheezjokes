import React from "react";

const Joke = function({vote, votes, text, id}) {
    function upVote(evt) { vote(id, +1); }
    function downVote(evt) { vote(id, -1); }
    
    return (
        <div>
            <div>
                <button onClick={upVote}>upvote</button>
            </div>
            <div>
                <button onClick={downVote}>downvote</button>
            </div>
            {votes}
            <div>{text}</div>
        </div>
    )
}

export default Joke;
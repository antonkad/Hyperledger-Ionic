/**
 * Transaction processor functions
 */


// Action when a vote transaction is submitted
function onVote(vote) {
    // Check that the user login and password are correct
    if (vote.password == vote.user.password) {
        return checkPollExists(vote);
    } else {
        throw new Error("Id or password are invalid !");
    }
}

// Check that designed poll exists
function checkPollExists(vote) {
    return getAssetRegistry('org.votechain.poll.Poll')
        .then(function (assetRegistry) {
            return query('selectPollById', {id: vote.poll})
                .then(function (results) {
                    if (results.length) {
                        var poll = results[0];
                        if (poll.actif) {
                            return checkNoVote(vote);
                        } else {
                            throw new Error("This poll is not active !")
                        }
                    } else {
                        throw new Error("No poll matching this ID !")
                    }
                });
        });
}

// Check that user has not voten yet
function checkNoVote(vote) {
    var userId = "resource:org.votechain.user.User#"+vote.user.id;
    return getAssetRegistry('org.votechain.user.User')
        .then(function (assetRegistry) {
            return query('selectVote', {user: userId, poll: vote.poll})
                .then(function (results) {
                    if (!results.length) {
                        return checkOptionExists(vote);
                    } else {
                        throw new Error("User has already voten !")
                    }
                });
        });
}

// Check that designed option exists
function checkOptionExists(vote) {
    return getAssetRegistry('org.votechain.option.Option')
        .then(function (assetRegistry) {
            return query('selectOptionById', {id : vote.option})
                .then(function (results) {
                    if (results.length) {
                        var option = results[0];
                        if (option.poll == vote.poll) {
                            option.count++;
                            return assetRegistry.update(option);
                        } else {
                            throw new Error("The option is not available for this poll !");
                        }
                    } else {
                        throw new Error("No option matching this ID !")
                    }
                });
        });
}
const followModel = require("../models/follow.model");
const userModel = require("../models/users.model");

async function followUserController(req, res) {
  const followeruserName = req.user.userName;
  const followeeuserName = req.params.userName;

  if (followeruserName === followeeuserName) {
    return res.status(400).json({
      message: "you can't follow your self",
    });
  }

  const isAleadyFollow = await followModel.findOne({
    follower: followeruserName,
    followee: followeeuserName,
  });

  if (isAleadyFollow) {
    return res.status(200).json({
      message: `You Aready Follow ${followeeuserName}`,
    });
  }

  const followeeExist = await userModel.findOne({
    userName: followeeuserName,
  });
  if (!followeeExist) {
    return res.status(400).json({
      message: "User not Exist You can't follow ",
    });
  }
  const followRecord = await followModel.create({
    follower: followeruserName,
    followee: followeeuserName,
  });

  res.status(201).json({
    message: `You are following ${followeeuserName}`,
    followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followeruserName = req.user.userName;
  const followeeuserName = req.params.userName;

  const isUserFollowing = await followModel.findOne({
    follower: followeruserName,
    followee: followeeuserName,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following${followeeuserName} `,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeuserName}`,
  });
}
module.exports = {
  followUserController,
  unfollowUserController,
};

import { format } from 'path';
import UserModels from '../models/UserModels.js';

export const getuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModels.findBy(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModels.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => UserModels.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await UserModels.findById(id);
    const friend = await UserModels.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => UserModels.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

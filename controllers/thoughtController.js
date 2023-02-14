const { Thought, User } = require('../models');

module.exports = {
  // Function to get all of the applications by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single application using the findOneAndUpdate method. We pass in the ID of the application and then respond with it, or an error if not found
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought was found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a new application. Accepts a request body with the entire Application object.
  // Because applications are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({message: 'Thought created, but found no user with that ID'})
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes an application from the database. Looks for an app by ID.
  // Then if the app exists, we look for any users associated with the app based on he app ID and update the applications array for the User.
  //{params}
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({message: 'No thought found with this id!'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    //   .then((thought) =>
    //     !thought
    //       ? res.status(404).json({ message: 'No thought was found with this id!' })
    //       : User.findOneAndUpdate(
    //           { applications: req.params.applicationId },
    //           { $pull: { applications: req.params.applicationId } },
    //           { new: true }
    //         )
    //   )

  },

 // Add an assignment to a student
 addReaction(req, res) {
  console.log('You are adding a reaction');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { new: true }
    // { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
// Remove assignment from a student
removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

  // Adds a tag to an application. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
  // addReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $push: { reactions: req.params.reactionId } },
  //     // { $push: { reactions: req.body } },
  //     { runValidators: true, new: true })
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: 'No reaction thought with this id!' })
  //         : res.json(thought)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // Remove application tag. This method finds the application based on ID. It then updates the tags array associated with the app in question by removing it's tagId from the tags array.
  // //{params, res}
  // removeReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $pull: { reactions:req.params.reactionId } },
  //     { new: true })
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: 'No reaction thought with this id!' })
  //         : res.json(thought)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};

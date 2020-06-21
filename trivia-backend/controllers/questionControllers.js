import mongoose from "mongoose";
import { QuestionSchema } from "../models/questionModel";
import { OptionSchema } from "../models/optionModel";

const Question = mongoose.model("Question", QuestionSchema);
const Option = mongoose.model("Option", OptionSchema);

export const getQuestions = (req, res) => {
  Question.find({}, (err, Question) => {
    if (err) {
      res.send(err);
    }
    res.json(Question);
  });
};

export const addNewQuestion = (req, res) => {
  let newQuestion = new Question(req.body);

  newQuestion.save((err, Question) => {
    if (err) {
      res.send(err);
    }
    res.json(Question);
  });
};

export const addNewOption = (req, res) => {
  let newOption = new Option(req.body);

  newOption.save((err, Option) => {
    if (err) {
      res.send(err);
    }
    res.json(Option);
  });
};

export const getOptionWithOptions = (req, res) => {
  //Defines query to filter for questions that weren't answered yet
  const queryForQuestion = {
    _id: {
      $nin: req.body.ids.map((questionId) => {
        return mongoose.Types.ObjectId(questionId);
      }),
    },
    category: req.body.category,
  };
  console.log(queryForQuestion);

  //Gets questions filtering by queryForQuestion, using aggregate with sample to get a random one
  Question.aggregate(
    [{ $match: queryForQuestion }, { $sample: { size: 1 } }],
    (err, questions) => {
      if (err) {
        res.send(err);
      }
      console.log(questions);
      questions.map((question) => {
        console.log(question.description);
        console.log(question);
        Option.findById(question.correctAnswerId, (err, option) => {
          if (err) {
            res.send(err);
          }
          console.log(option);
          question.options = [option];
          console.log(question.options);
          const queryForOptions = {
            $and: [
              { _id: { $not: { $eq: question.correctAnswerId } } },
              { category: question.category },
              { subcategory: question.subcategory },
            ],
          };
          console.log(queryForOptions);
          Option.aggregate(
            [{ $match: queryForOptions }, { $sample: { size: 3 } }],
            (err, options) => {
              if (err) {
                res.send(err);
              }
              console.log(options);
              options.map((option) => {
                question.options.push(option);
              });
              question.options.map((option) => {
                option.randomOrder = Math.floor(Math.random() * 100);
              });
              question.options.sort((a, b) => {
                return a.randomOrder < b.randomOrder ? -1 : 1;
              });
              res.status(200).json(question);
            }
          );
        });
      });
    }
  );
};

import GiminiAiAssistant from "../../config/aiAssistantService.js";
import { AiChat } from "../../models/aiChart.model.js";
import { Task } from "../../models/task.model.js";
import { User } from "../../models/user.model.js";

export const aiAssistantController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { userMessage } = req.body;
    const userId = req.user._id;

    if (!userMessage) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message ",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userTask = await Task.find({ user: userId });

    const aiResponse = await GiminiAiAssistant(userMessage, userTask, user);

    let chart = await AiChat.findOne({ user: userId });

    if (!chart) {
      chart = await AiChat.create({ user: userId });
    }

    chart.chats.push({
      role: "user",
      content: userMessage,
    });

    if (aiResponse.action === "CREATE_TASK") {
      let steps = aiResponse.task.steps;

      // Handle case where AI returns steps as a stringified JSON
      if (typeof steps === "string") {
        try {
          steps = JSON.parse(steps);
        } catch (error) {
          steps = [steps]; // Fallback: treat as a single step
        }
      }

      // Ensure steps is an array of strings (extract 'step' property if it's an object)
      if (Array.isArray(steps)) {
        steps = steps.map((s) =>
          typeof s === "object" && s.step ? s.step : s
        );
      } else {
        steps = [];
      }

      const newTask = await Task.create({
        user: req.user._id,
        ...aiResponse.task,
        steps,
      });

      // Update User model to include the new task
      await User.findByIdAndUpdate(req.user._id, {
        $push: { tasks: newTask._id },
      });

      // Save AI response to chat history
      chart.chats.push({
        role: "assistant",
        content: `Task created: ${newTask.title}`,
      });
      await chart.save();

      return res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask,
      });
    } else {
      // Handle CHAT action: Save reply and send response
      chart.chats.push({
        role: "assistant",
        content: aiResponse.reply,
      });
      await chart.save();

      return res.status(200).json(aiResponse);
    }
  } catch (error) {
    console.log(error);
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI usage limit exceeded. Please try again later.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

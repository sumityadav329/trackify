# Trackify - Your Personal Progress Tracker

Trackify is a simple and intuitive web application designed to help you track progress on any project or goal. Whether it's a personal habit, a work project, or a complex multi-step process, Trackify provides a clear, visual way to monitor your advancement.

## Features

*   **Easy Tracker Definition**: Define your tracker with a title and a series of steps.
*   **Status Tracking**: For each step, mark its current status: Not Started, Working, Having Issues, Fixed, or Ready.
*   **Progress Visualization**: See a clear overview of where you are in your process.
*   **Report Generation**: Download a CSV report of your tracker's current state.

## How to Use Trackify

Follow these steps to get the most out of Trackify:

### 1. Create a New Tracker

*   **Title**: Enter a meaningful title for your tracker in the "Tracker Title" input field. This could be anything from "Learn Spanish" to "Complete Project X".
*   **Steps**: Add individual steps to your tracker. Each step should be a specific, actionable item.
    *   Type the step into the "Add Step" input field.
    *   Click the "Add" button to add the step to your tracker.
*   **Delete Steps**: If you need to remove a step, click the "X" button next to the step.

### 2. Manage Step Statuses

*   Once you've created your tracker, each step will have a series of checkboxes: "Working", "Not Started", "Having Issues", "Fixed", and "Ready".
*   Select the checkbox that corresponds to the current status of the step. Only one status can be active at any time.

### 3. Download and Save the Report

*   To download a report of your tracker's current status:
    *   Click the "Download Report" button.
    *   A CSV file will be generated and downloaded to your computer.
*   The CSV file contains the following information for each step:
    *   Step Name
    *   Working (Yes/No)
    *   Not Started (Yes/No)
    *   Having Issues (Yes/No)
    *   Fixed (Yes/No)
    *   Ready (Yes/No)

## Example Usage Scenario

Let's say you're planning a website launch. You can create a tracker with the following steps:

1.  Design mockups
2.  Develop front-end
3.  Develop back-end
4.  Write content
5.  Test website
6.  Deploy website

As you progress, update the statuses of each step. For example, if you're currently working on the front-end development but are encountering some issues, you would check "Working" and "Having Issues" for that step.

Once all steps are marked as "Ready", you know you're ready to launch your website! Download the report to keep a record of your project's progress.

## Get Started

To get started, take a look at `src/app/page.tsx`.

using Abstraction.Models;
using System.Collections.Generic;
using System.Linq;

namespace portfolio.Services;

public class PortfolioDataService : IPortfolioDataService
{
    public IEnumerable<ProjectCard> GetProjectCards()
    {
        return new ProjectCard[]
        {
            new ProjectCard() {
                Title = "Chess Online",
                Description="Web online chess application",
                ImageSrc="/data/chess_online.png",
                SourceUrl="https://github.com/tomaszgawron901/chess-app-web",
                WebUrl="https://chesswebapplication.azurewebsites.net/",
                Tools = new string[] {
                    "C#",
                    "ASP.NET Core",
                    "Blazor",
                    "SignalR",
                    "Azure"
                },
            },
            new ProjectCard() {
                Title="Chess",
                Description="Desktop and Web chess app",
                ImageSrc="/data/chess_desktop.png",
                SourceUrl="https://github.com/tomaszgawron901/Chess",
                WebUrl="https://chesswebapp20200710224408.azurewebsites.net",
                Tools = new string[] {
                    "WPF",
                    "C#",
                    "Blazor",
                    "JavaScript"
                }
            },
            new ProjectCard() {
                Title="Minesweeper",
                Description="Web minesweeper app",
                ImageSrc="/data/saper.png",
                SourceUrl="https://github.com/tomaszgawron901/Saper",
                WebUrl="https://tomaszgawron901.github.io/Saper/",
                Tools= new string[] {
                    "TypeScript",
                    "HTML",
                    "Sass",
                    "Node.js"
                }
            },
            new ProjectCard()
            {
                Title="NotePocket",
                Description="Web application for creating, editing and storing notes",
                ImageSrc="/data/note_pocket.png",
                SourceUrl="https://github.com/tomaszgawron901/JavaScript-programing-projects",
                WebUrl="https://tomaszgawron901.github.io/JavaScript-programing-projects/Projekt3/index.html",
                Tools= new string[]
                {
                    "JavaScript",
                    "HTML",
                    "CSS"
                }
            },
            new ProjectCard()
            {
                Title="ToDo notes",
                Description="Mobile application for creating, editing and storing notes.",
                ImageSrc="/data/todo_app.png",
                SourceUrl="https://github.com/tomaszgawron901/ToDoApp",
                Tools= new string[]
                {
                    "TypeScript",
                    "React Native",
                    "Redux",
                    "Expo"
                }
            },
            new ProjectCard()
            {
                Title="Image Editor",
                Description="Web application for editing images",
                ImageSrc="/data/image_editor.png",
                SourceUrl="https://github.com/tomaszgawron901/JavaScript-programing-projects",
                WebUrl="https://tomaszgawron901.github.io/JavaScript-programing-projects/Projekt2/index.html",
                Tools= new string[]
                {
                    "JavaScript",
                    "HTML",
                    "CSS"
                }
            }
        };
    }

    public IEnumerable<ToolGroup> GetTools()
    {
        return new ToolGroup[]
        {
            new ToolGroup()
            {
                GroupName = "Programming Languages",
                Tools = new List<ToolPercentage>()
                {
                    new ToolPercentage() { Name = "C#", Percentage = 85 },
                    new ToolPercentage() { Name = "JS/TS", Percentage = 75 },
                    new ToolPercentage() { Name = "Python", Percentage = 60 },
                    new ToolPercentage() { Name = "Java", Percentage = 20 },
                    new ToolPercentage() { Name = "C++", Percentage = 50 },
                    new ToolPercentage() { Name = "CSS & HTML", Percentage = 80 },

                }.OrderByDescending(x => x.Percentage)
            },
            new ToolGroup()
            {
                GroupName = "Web Frameworks",
                Tools = new List<ToolPercentage>()
                {
                    new ToolPercentage() { Name = "Angular", Percentage = 75 },
                    new ToolPercentage() { Name = "React", Percentage = 20 },
                    new ToolPercentage() { Name = "Blazor", Percentage = 70 },
                }.OrderByDescending(x => x.Percentage)
            },
            new ToolGroup()
            {
                GroupName = ".NET Products",
                Tools = new List<ToolPercentage>()
                {
                    new ToolPercentage() { Name = "ASP.NET Core", Percentage = 75 },
                    new ToolPercentage() { Name = "Blazor", Percentage = 70 },
                    new ToolPercentage() { Name = "SignalR", Percentage = 85 },
                    new ToolPercentage() { Name = "WPF", Percentage = 50 },

                }.OrderByDescending(x => x.Percentage)
            },
            new ToolGroup()
            {
                GroupName = "Development Tools",
                Tools = new List<ToolPercentage>()
                {
                    new ToolPercentage() { Name = "Git", Percentage = 70 },
                    new ToolPercentage() { Name = "GitHub", Percentage = 65 },
                    new ToolPercentage() { Name = "GitLab", Percentage = 60 },
                    new ToolPercentage() { Name = "Azure DevOps", Percentage = 20 },

                }.OrderByDescending(x => x.Percentage)
            }
        };
    }
}
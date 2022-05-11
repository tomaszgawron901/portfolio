using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using portfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace portfolio.Content;

public partial class Projects
{
    private string Title = "College projects";
    private IEnumerable<ProjectCard> ProjectsList = new ProjectCard[]
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

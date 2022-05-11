using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using portfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace portfolio.Content;

public partial class Toolset
{
    private class ToolGroup
    {
        public string GroupName { get; set; }
        public IEnumerable<ToolPercentage> Tools { get; set; }
}
    

    private string Title = "Toolset";
    private IEnumerable<ToolGroup> ToolGroups { get; set; }

    public Toolset()
    {
        ToolGroups = new List<ToolGroup>()
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

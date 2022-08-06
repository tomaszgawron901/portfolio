using Microsoft.AspNetCore.Components;
using portfolio.Models;
using portfolio.Services;
using System.Collections.Generic;
using System.Linq;

namespace portfolio.Content;

public partial class Projects: ComponentBase
{
    [Inject] private IPortfolioDataService? _portfolioDataService { get; init; }

    private string Title = "College projects";

    protected override void OnInitialized()
    {
        base.OnInitialized();
        ProjectsList = _portfolioDataService?.GetProjectCards() ?? Enumerable.Empty<ProjectCard>();
    }

    private IEnumerable<ProjectCard>? ProjectsList { get; set; }
}

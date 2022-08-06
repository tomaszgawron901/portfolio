using Microsoft.AspNetCore.Components;
using portfolio.Models;
using portfolio.Services;
using System.Collections.Generic;
using System.Linq;


namespace portfolio.Content;

public partial class Toolset: ComponentBase
{
    [Inject] private IPortfolioDataService? _portfolioDataService { get; init; }

    private string Title = "Toolset";
    private IEnumerable<ToolGroup>? ToolGroups { get; set; }

    protected override void OnInitialized()
    {
        base.OnInitialized();
        ToolGroups = _portfolioDataService?.GetTools() ?? Enumerable.Empty<ToolGroup>();
    }


}

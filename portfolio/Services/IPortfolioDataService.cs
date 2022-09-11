using Abstraction.Models;
using System.Collections.Generic;

namespace portfolio.Services;

public interface IPortfolioDataService
{
    IEnumerable<ProjectCard> GetProjectCards();
    IEnumerable<ToolGroup> GetTools();
    
}

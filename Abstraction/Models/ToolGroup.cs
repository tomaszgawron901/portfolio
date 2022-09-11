using System.Collections.Generic;
using System.Linq;

namespace Abstraction.Models;

public  class ToolGroup
{
    public string GroupName { get; init; } = ""!;
    public IEnumerable<ToolPercentage> Tools { get; init; } = Enumerable.Empty<ToolPercentage>()!;
}

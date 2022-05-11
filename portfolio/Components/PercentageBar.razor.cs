using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace portfolio.Components;

public partial class PercentageBar
{
    [Parameter]
    public int Percentage { get; set; }

    [Parameter]
    public string? Label { get; set; }
}

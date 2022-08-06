using Microsoft.AspNetCore.Components;


namespace portfolio.Components;

public partial class PercentageBar
{
    [Parameter]
    public int Percentage { get; set; }

    [Parameter]
    public string? Label { get; set; }
}

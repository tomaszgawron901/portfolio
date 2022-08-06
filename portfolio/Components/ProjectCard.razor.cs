using Microsoft.AspNetCore.Components;


namespace portfolio.Components;

public partial class ProjectCard
{
    [Parameter]
    public RenderFragment Content { get; set; }

    [Parameter]
    public RenderFragment Header { get; set; }

    [Parameter]
    public RenderFragment Reveal { get; set; }

    [Parameter]
    public string Title { get; set; }

    [Parameter]
    public string Web { get; set; }

    [Parameter]
    public string Git { get; set; }

    private bool collapse = true;

    private string RevealCssClass => collapse ? "collapse" : null;

    public void Open()
    {
        collapse = false;
    }

    public void Close()
    {
        collapse = true;
    }
}

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using portfolio.Content;
using portfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace portfolio.Components;

public partial class TabControll
{
    [Parameter]
    public RenderFragment ChildContent { get; set; }

    [Parameter]
    public RenderFragment MainPage { get; set; }

    protected List<Page> Pages = new List<Page>();
    public Page ActivePage { get; set; }

    private TopNavigator navigation;

    private Background? Background;

    private async Task Scrolled(ScrollEventArgs e)
    {
        if ( e?.ScrollTop is not null && Background is not null)
        {
            Background.ScrollTop((int)e.ScrollTop/2);
        }

        foreach (Page page in Pages)
        {
            if (await page.IsInCenter())
            {
                ActivePage = page;
                break;
            }
        }
    }

    internal void AddPage(Page page)
    {
        Pages.Add(page);
        if (Pages.Count == 1)
        {
            ActivePage = page;
        }
        StateHasChanged();
    }

    public void ScrollTo(int index)
    {
        Pages[index].ScrollTo();
    }
}

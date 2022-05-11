using System.Collections.Generic;

namespace portfolio.Models;

public class ProjectCard
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? WebUrl { get; set; }
    public string? SourceUrl { get; set; }
    public IEnumerable<string>? Tools { get; set; }
    public string? ImageSrc { get; set; }
}

using Microsoft.AspNetCore.Builder;
using Microsoft.SemanticKernel;
using MinikZekaAI_Web.Hubs;
using MinikZekaAI_Web.Services;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllersWithViews();
var key = configuration["SMTP:key"];
string apiKey = configuration["Gemini:key"];
// Removes all whitespace characters (spaces, tabs, newlines, etc.)
string cleanedKey = new string(apiKey.Where(c => !char.IsWhiteSpace(c)).ToArray());
var skBuilder = Kernel.CreateBuilder();
#pragma warning disable SKEXP0070
builder.Services
    .AddKernel()
    .AddGoogleAIGeminiChatCompletion(
        modelId: "gemini-2.0-flash",
        apiKey: apiKey
    );

builder.Services.AddSignalR();
builder.Services.AddControllersWithViews();

// Register UserService as a singleton
builder.Services.AddSingleton<IAIService, AIService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();




app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapGet("/", context =>
{
    context.Response.Redirect("/Giris/Anket");
    return Task.CompletedTask;
});



app.MapHub<AIHub>("ai-hub");
app.Run();

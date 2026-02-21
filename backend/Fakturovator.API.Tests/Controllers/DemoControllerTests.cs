using Microsoft.AspNetCore.Mvc;
using Fakturovator.API.DTOs;
using Fakturovator.API.Controllers;
using Fakturovator.API.Services;
using Moq;
using Xunit;

namespace Fakturovator.API.Tests.Controllers
{
    public class DemoControllerTests : IDisposable
    {
        private readonly Mock<IDemoService> _mockDemoService;
        private readonly DemoController _controller;

        public DemoControllerTests()
        {
            _mockDemoService = new Mock<IDemoService>();
            _controller = new DemoController(_mockDemoService.Object);
        }

        [Fact]
        public async Task GetDemos_ReturnsEmptyList_WhenNoDemosExist()
        {
            // Arrange
            _mockDemoService.Setup(s => s.GetAllAsync())
                .ReturnsAsync(new List<DemoDto>());

            // Act
            var result = await _controller.GetDemos();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var demos = Assert.IsAssignableFrom<IEnumerable<DemoDto>>(okResult.Value);
            Assert.Empty(demos);
        }

        [Fact]
        public async Task GetDemos_ReturnsDemos_WhenDemosExist()
        {
            // Arrange
            var demoDtos = new List<DemoDto>
            {
                new DemoDto { Id = Guid.NewGuid(), Content = "Test Content", CreatedAt = DateTime.UtcNow }
            };
            _mockDemoService.Setup(s => s.GetAllAsync())
                .ReturnsAsync(demoDtos);

            // Act
            var result = await _controller.GetDemos();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var demos = Assert.IsAssignableFrom<IEnumerable<DemoDto>>(okResult.Value);
            Assert.Single(demos);
            Assert.Equal("Test Content", demos.First().Content);
        }

        [Fact]
        public async Task CreateDemo_ReturnsBadRequest_WhenRequestIsNull()
        {
            // Act
            var result = await _controller.CreateDemo(null!);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task CreateDemo_ReturnsBadRequest_WhenContentIsEmpty()
        {
            // Arrange
            var request = new CreateDemoRequest { Content = "" };

            // Act
            var result = await _controller.CreateDemo(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task CreateDemo_ReturnsCreatedDemo_WhenContentIsValid()
        {
            // Arrange
            var request = new CreateDemoRequest { Content = "New Demo Content" };
            var createdDto = new DemoDto { Id = Guid.NewGuid(), Content = "New Demo Content", CreatedAt = DateTime.UtcNow };
            _mockDemoService.Setup(s => s.CreateAsync(request))
                .ReturnsAsync(createdDto);

            // Act
            var result = await _controller.CreateDemo(request);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdDemo = Assert.IsType<DemoDto>(createdAtActionResult.Value);
            Assert.Equal(request.Content, createdDemo.Content);
            Assert.NotEqual(Guid.Empty, createdDemo.Id);
        }

        [Fact]
        public async Task CreateDemo_ReturnsBadRequest_WhenContentIsWhitespace()
        {
            // Arrange
            var request = new CreateDemoRequest { Content = "   " };

            // Act
            var result = await _controller.CreateDemo(request);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task DeleteDemo_ReturnsNoContent_WhenDemoExists()
        {
            // Arrange
            var demoId = Guid.NewGuid();
            _mockDemoService.Setup(s => s.DeleteAsync(demoId))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteDemo(demoId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteDemo_ReturnsNotFound_WhenDemoDoesNotExist()
        {
            // Arrange
            var demoId = Guid.NewGuid();
            _mockDemoService.Setup(s => s.DeleteAsync(demoId))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.DeleteDemo(demoId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        public void Dispose()
        {
        }
    }
}

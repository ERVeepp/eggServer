'use strict';

const Controller = require('egg').Controller;

class MockBiController extends Controller {
  // 登录
  async login() {
    const { ctx } = this;
    ctx.body = { "code": 200, "info": "Login successful", "data": { "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjVNeUdMR2pPQTIifQ.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6OTUyNyIsImF1ZCI6Imh0dHA6XC9cL2FkbWluLmFkc3Bvb2xzLmNuIiwianRpIjoiNU15R0xHak9BMiIsImlhdCI6MTYxMzk3NDgyMCwibmJmIjoxNjEzOTc0ODIwLCJleHAiOjE2MTQwNjEyMjAsInVzZXIiOnsiaWQiOjEsImVtYWlsIjoiZGV2QHFxLmNvbSIsIm5hbWUiOiJcdTczOGJcdTRmMWYiLCJyb2xlX2lkIjoxLCJwbV9pZCI6NjYsInRva2VuIjoiZWNlZjk1MzJlM2VlNmU4NDNkNTA3MmMzM2UwNmJlYzEifX0.9QndDP-RLxNi1Bs7tjmDRu_8YtXQkstkwBJIxByf2CQ" } }
  }
  // 获取权限表
  async getRoles() {
    const { ctx } = this;
    ctx.body = {
      "success": true,
      "code": 200,
      "message": "OK",
      "data": {
        "permission": [
          {
            "id": "1",
            "type": "用户 --- 查看列表"
          },
          {
            "id": "2",
            "type": "用户 --- 查看详细信息"
          },
          {
            "id": "3",
            "type": "用户 --- 创建用户"
          },
          {
            "id": "4",
            "type": "用户 --- 修改用户"
          },
          {
            "id": "5",
            "type": "角色 --- 查看列表"
          },
          {
            "id": "6",
            "type": "角色 --- 查看详细信息"
          },
          {
            "id": "7",
            "type": "角色 --- 创建角色"
          },
          {
            "id": "8",
            "type": "角色 --- 修改角色"
          },
          {
            "id": "9",
            "type": "岗位 --- 查看列表"
          },
          {
            "id": "10",
            "type": "岗位 --- 查看详细信息"
          },
          {
            "id": "11",
            "type": "岗位 --- 创建岗位"
          },
          {
            "id": "12",
            "type": "岗位 --- 修改岗位"
          },
          {
            "id": "13",
            "type": "权限 --- 查看列表"
          },
          {
            "id": "14",
            "type": "权限 --- 查看详细信息"
          },
          {
            "id": "15",
            "type": "权限 --- 创建权限"
          },
          {
            "id": "16",
            "type": "权限 --- 修改权限"
          },
          {
            "id": "17",
            "type": "项目 --- 查看列表"
          },
          {
            "id": "18",
            "type": "项目 --- 查看详细信息"
          },
          {
            "id": "19",
            "type": "用户 --- 删除用户"
          },
          {
            "id": "20",
            "type": "项目 --- 创建项目"
          },
          {
            "id": "21",
            "type": "项目 --- 修改项目"
          },
          {
            "id": "22",
            "type": "产品 --- 查看列表"
          },
          {
            "id": "23",
            "type": "产品 --- 查看详细信息"
          },
          {
            "id": "24",
            "type": "产品 --- 创建产品信息"
          },
          {
            "id": "25",
            "type": "产品 --- 修改产品信息"
          }
        ],
        "menu": [
          {
            "id": "1",
            "name": "数据概览",
            "url": "/overview",
            "pid": "0"
          },
          {
            "id": "2",
            "name": "指标分析",
            "url": "/analysis",
            "pid": "0"
          },
          {
            "id": "3",
            "name": "后台管理",
            "url": "/administer",
            "pid": "0"
          },
          {
            "id": "4",
            "name": "数据概览-游戏",
            "url": "overview-game",
            "pid": "1"
          },
          {
            "id": "5",
            "name": "数据概览-工具",
            "url": "overview-tool",
            "pid": "1"
          },
          {
            "id": "6",
            "name": "ROI",
            "url": "analysis-roi",
            "pid": "2"
          },
          {
            "id": "7",
            "name": "用户管理",
            "url": "administer-user",
            "pid": "3"
          },
          {
            "id": "8",
            "name": "角色管理",
            "url": "administer-role",
            "pid": "3"
          },
          {
            "id": "9",
            "name": "项目管理",
            "url": "administer-project",
            "pid": "3"
          }
        ],
        "element": [
          {
            "id": "1",
            "name": "创建项目组",
            "code": "AP-001",
            "desc": "项目页"
          }
        ],
        "operation": [
          {
            "id": "1",
            "name": "用户列表页",
            "code": "US001",
            "method": "index",
            "url": "user",
            "pid": "0"
          },
          {
            "id": "2",
            "name": "用户详情页",
            "code": "US002",
            "method": "view",
            "url": "user",
            "pid": "0"
          },
          {
            "id": "3",
            "name": "创建用户",
            "code": "US003",
            "method": "create",
            "url": "user",
            "pid": "0"
          },
          {
            "id": "4",
            "name": "修改用户",
            "code": "US004",
            "method": "update",
            "url": "user",
            "pid": "0"
          },
          {
            "id": "5",
            "name": "角色列表页",
            "code": "RO001",
            "method": "index",
            "url": "role",
            "pid": "0"
          },
          {
            "id": "6",
            "name": "角色详情页",
            "code": "RO002",
            "method": "view",
            "url": "role",
            "pid": "0"
          },
          {
            "id": "7",
            "name": "创建角色",
            "code": "RO003",
            "method": "create",
            "url": "role",
            "pid": "0"
          },
          {
            "id": "8",
            "name": "修改角色",
            "code": "RO004",
            "method": "update",
            "url": "role",
            "pid": "0"
          }
        ]
      }
    }
  }
  // 获取单个权限
  async getRole() {
    const { ctx } = this;
    ctx.body = {
      "code": 20000,
      "info": "success",
      "data": ["ww-overview", "ww-overview-game", "ww-overview-game-show", "ww-overview-game-operation", "ww-overview-tool", "ww-overview-tool-show", "ww-overview-tool-operation", "ww-analysis", "ww-analysis-roi", "ww-analysis-roi-show", "ww-analysis-roi-operation", "ww-administer", "ww-administer-user", "ww-administer-user-show", "ww-administer-user-operation", "ww-administer-role", "ww-administer-user-show", "ww-administer-user-operation", "ww-administer-project", "ww-administer-project-show", "ww-administer-project-operation"]
    }
  }
}

module.exports = MockBiController;

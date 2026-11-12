/**********************************************************************
 * CopyRight 2024 杭州集控科技有限公司 版权所有
 * 功能描述：以前业务JS代码 写到了框架JS中 不方便升级 转移到这里 方便后面框架升级 这里的代码每个项目可以不一样
 * 创建标识：吴飞飞 2024/07/25
 ************************************************************************
 * 以前众望项目写了好多调自己写的接口,后期如果非要写的话 可以封装一下 减少代码量 , 或者能写到Bcf里面就写到Bcf里面
 * 以下所有代码是按众望项目2023年的JS代码为例子 转移动过来的 因每个项目都不一样 首次升级时 必须根据自己项目的JS 从新整理一次！！！
 ************************************************************************/

MesExtBusiness = {
    //1.1：主列表Master+Bill是否显示子表【根据自己项目业务,没有的话,删除不要的代码,直接返回true】 1.app.8535ea84b746370f8f01.js
    getSubIsExistInfo: function (progId) {
        if (progId.indexOf("com.LabelFormat") >= 0 || progId.indexOf("stk.FPWorkShopProduct") >= 0) {
            return false;
        }
        return true;
    },

    //1.1：主列表Master+Bill显示那张子表【根据自己项目业务,没有的话,删除不要的代码,直接返回0】
    getSubTableIndex: function (progId) {
        //if (progId == "pls.WeavPlan") {
        //    return 2;
        //} else
        if (progId == "stk.HalfDyeStockOut" || progId == "com.Customer") {
            return 1;
        }
        return 0;
    },

    //3.1：主列表Master+Bill行样式【根据自己项目业务,没有的话,删除不要的代码,直接返回""】 3.LibToolBarBuilder.js
    getRowClass: function (progId, record, rowIndex, rowParams, store) {
        if (progId == "stk.FinishProductStockDetail") {
            if (record.data.PRODUCTSTATE == 1) {
                return "red";
            }
        }
        if (progId == "ds.Product") {
            if (record.data.ISFS == 0) {
                return "red";
            }
        }

        if (progId == "stk.HalfAfterAccount") {
            if (record.data.state == 2) {
                return "yellow";
            }
            else if (record.data.state == 3) {
                return "red";
            }
        }
        if (progId == "pls.WeavPlan") {
            if (record.data.ISPRINT == 0) {
                return "red";
            }
        }
        else if (progId == "pls.WarpPracticable") {
            if (record.data.ISPRINT == 0) {
                return "red";
            }
        }
        else if (progId == "qc.PurCheckOrder") {
            if (record.data.CHECKRESULT == 0) {
                return "red";
            }
        }
        else if (progId == "ds.Proofing") {   //todo:vic color
            if (record.data.CURRENTSTATE != 2) {
                return "red";
            }
        }
        else if (progId == "sp.DyeOrder" || progId == "sp.PurchaseOrder"
            || progId == "sp.TwistOrder" || progId == "sp.MaterialSchedule"
            || progId == "sp.DyeSchedule" || progId == "sp.TwistSchedule"
            || progId == "sp.PurchaseArrivalOrder" || progId == "stk.OutArrivalBill") {
            if (record.data.CURRENTSTATE == 1) {
                return "red";
            }
        }
        else if (progId == "stk.PurMaterialStockIn" || progId == "stk.PurMaterialStockReturn" || progId == "stk.MaterialTakeout" 
            || progId == "stk.TakeawayStockOut" || progId == "stk.OutsourcingClaimant"
            || progId == "stk.WarpStockOut" || progId == "stk.WarpStockReturn"
            || progId == "stk.WeavStockOut" || progId == "stk.WeavStockReturn"
            || progId == "stk.ProofingStockOut" || progId == "stk.ProofingStockReturn"
            || progId == "stk.OutsourcingStockOut" || progId == "stk.OutsourcingStockIn"
            || progId == "stk.OutsourcingStockReturn" || progId == "stk.OutsourcingStockLoss"
            || progId == "stk.MoveStock" || progId == "stk.OtherMaterialStockIn"
            || progId == "stk.OtherMaterialStockOut" || progId == "stk.MaterialLoss"
            || progId == "stk.HalfProductSendOut" || progId == "stk.ReturnGoodsNotice"
            || progId == "qc.OutWeaveProduct" || progId == "stk.Claimant" || progId == "stk.LossCloth"
            || progId == "com.CustomerProduct" || progId == "com.Customer" || progId == "ds.GuidePrice"
            || progId == "pls.Outsourcing" || progId == "sal.CollectionAmountOrder" || progId == "stk.HalfChangeProduct") {
            if (record.data.CURRENTSTATE == 1) {
                return "red";
            }
        }
        else if (progId == "sal.SaleOrderLabel" && record.data.isPrint == 0) {   //todo:vic color
            return "red";
        }
        else if (progId == "sal.SaleOrderJF" && (record.data.CURRENTSTATE != 2 && record.data.CURRENTSTATE != 3)) {   //todo:vic color
            return "red";
        }
        else if (progId == "qc.FinishProduct" && record.data.CHECKSTATE == 6) {   //todo:vic color
            return "red";
        }
        else if (progId == "stk.StockOutInFailRecord" && record.data.curState == 0) {   //todo:vic color
            return "green";
        }
        else if (progId == "stk.OutsourcingStockOut" || progId == "stk.OutsourcingStockIn"
            || progId == "stk.PurMaterialStockIn" || progId == "stk.ProofingStockOut"
            || progId == "stk.ProofingStockReturn" || progId == "stk.WarpStockOut"
            || progId == "stk.WarpStockReturn" || progId == "stk.WeavStockOut" || progId == "stk.WeavStockReturn"
            || progId == "stk.HalfWeavStockOut" || progId == "stk.HalfWeavStockIn" || progId == "stk.HalfDyeStockOut"
            || progId == "stk.HalfDyeStockIn" || progId == "stk.HalfProfitAndLoss" || progId == "stk.OutsourcingStockLoss"
            || progId == "stk.FinishProductStockIn" || progId == "stk.FinishProductStockOut" || progId == "stk.FpAllocationApply"
            || progId == "stk.NoOrder" || progId == "stk.TransferLibrary" || progId == "stk.FinishProductInventory"
            || progId == "stk.FinishProductProfitAndLoss" || progId == "stk.ProductDyePrice"
        ) {   //todo:vic color
            if (record.data.CURRENTSTATE == 1)
                return "red";
        }
        if (progId == "stk.WarpStockReturn" || progId == "stk.WeavStockOut" || progId == "stk.WeavStockReturn"
            || progId == "stk.WarpStockOut" ) {
            if (record.data.ISFS == 0) {
                return "yellow";
            }
        }
        else if (progId == "qc.FinishProductRepair") {
            if (record.data.State != 1) {
                return "red";
            }
        }
        else if (progId == "stk.GoodsTraffic") {
            if (record.data.BSALEBOOKING == "N") {
                return "red";
            }
        }
        else if (progId == "stk.AccountDetail") {
            if (record.data.QUANTITY < 0) {
                return "red";
            }
        }
        else if (progId == "sp.TwistSchedule" || progId == "sp.DyeSchedule") {
            if (record.data.ISORDER == 0) {
                return "red";
            }
        }
        else if (progId == "pls.WarpPlan" || progId == "pls.WarpPracticable" || progId == "pls.PreSendProducePlan" || progId == "pls.WeavCheckSample") {
            if (record.data.CURRENTSTATE == 1) {
                return "red";
            }
        }
        else if (progId == "pls.WarpToWeavPracticable" || progId == "sal.CustomerProductQuote" || progId == "qc.OutPurchase"
            || progId == "stk.HalfAllocation" || progId == "qc.HalfProduct" || progId == "stk.FPWorkShopProduct" || progId == "stk.FinishProductBarCode"
            || progId == "stk.ReturnWorkShop" || progId == "stk.SampleCloth" || progId == "stk.NoOrderStockOut"
        ) {
            if (record.data.CURRENTSTATE == 1) {
                return "red";
            }
        }
        else if (progId == "sal.SaleOrderLabel") {
            if (record.data.CODESTATE == 7) {
                return "red";
            }
        }
        return "";
    },

    //3.2：主列表Master+Bill的子表行样式【根据自己项目业务,没有的话,删除不要的代码,直接返回""】
    getSubRowClass: function (progId, record, rowIndex, rowParams, store) {
        if (record == "stk.FinishProductStockIn") {
            if (record.data.ISEXIST != 0 && record.data.InState != 1) {
                return "red";
            }
        }
        else if (record == "stk.Account") {
            if (record.data.OccupyQUANTITY < record.data.UNQUANTITY) {
                return "red";
            }
        }
        else if (progId == "pls.AfterBind" || progId == "pls.AfterWayDealTask") {
            if (record.data.DeliveryDate) {
                var currentDate = new Date();
                var year = currentDate.getFullYear();
                var month = currentDate.getMonth() + 1;

                var monthStr = "";
                if (month < 10) {
                    monthStr = "0" + (month);
                }
                var date = currentDate.getDate();
                var dateStr = "";
                if (date < 10) {
                    dateStr = "0" + date;
                }
                var currentDataExt = new Date(year, month, date);
                var fmtDate = parseInt(`${year}${monthStr}${dateStr}`);
                if (record.data.DeliveryDate > 0 && record.data.DeliveryDate < fmtDate) {
                    if (fmtDate > record.data.DeliveryDate) {

                        var deliDate = new Date((record.data.DeliveryDate + "").slice(0, 4),
                            (record.data.DeliveryDate + "").slice(4, 6),
                            (record.data.DeliveryDate + "").slice(6, 8));

                        var diffDay = (currentDataExt.getTime() - deliDate.getTime()) / (24 * 3600 * 1000);

                        if (diffDay <= 3) {
                            return "reddark";
                        } else if (diffDay > 3 && diffDay <= 7) {
                            return "bluedark";
                        } else {
                            return "red";
                        }
                    }
                }
            }
        }
        return "";
    },


    //2.1：是否清除弹出页面的单据类型为Grid 的审核工具按钮【根据自己项目业务,没有的话,删除不要的代码,直接返回gridFuncItems】  2.GridManager.js
    clearGridFuncItems: function (progId, gridFuncItems) {
        if (progId == "qc.FinishProductCollageFunc" || progId == "qc.FinishProductCutFunc" || progId == "qc.FinishProductMeritsFunc") {
            gridFuncItems = [];
        }
        return gridFuncItems;
    },


    //2.2：弹出页面的行选择模式【根据自己项目业务,没有的话,删除不要的代码,直接返回""】
    getGridSelType: function (vcl) {
        return (vcl.progId =="qc.SelProductTotalFunc" || vcl.progId == "qc.OutPurchase" || vcl.progId == "sal.SaleOrderJF" || vcl.progId == "qc.WaitCheckProduct"
            || vcl.progId == "qc.SelProductFunc" || vcl.progId == "qc.SelPalletFunc" || vcl.progId == "sp.DyeOrderDetailRpt"
            || vcl.progId == "sal.SaleOrderExecuteFunc" || vcl.progId == "sal.SaleOrderJFTotalRptFunc" || vcl.progId == "stk.StockTotalFunc"
            || vcl.progId == "ds.ProductUnAttrFunc" || vcl.progId == "sp.MaterialOrderFunc" || vcl.progId == "sp.TwistOrderDetailRpt"
            || vcl.progId == "pls.WeavPlan" || vcl.progId == "stk.OutAccountFunc" || vcl.progId == "stk.FpAllocationApply"
            || vcl.progId == "stk.FPStockDetailSendGoodsFunc" || vcl.progId == "sp.PurchaseOrderDetailRpt" || vcl.progId == "stk.FinishProductStockIn"
            || vcl.progId == "stk.SampleCloth" || vcl.progId == "stk.TransferLibrary" || vcl.progId == "stk.HalfDyeStockIn" || vcl.progId == "stk.HalfDyeStockInTotalFunc"
            || vcl.progId == "stk.GoodsTraffic" || vcl.progId == "stk.GoodsTrafficProductEdit" || vcl.progId == "axp.PermissionSelFFunc"
            || vcl.progId == "axp.PermissionGroup" || vcl.progId == "sal.OrderProductStateFunc"
            || vcl.progId == "stk.HalfWeavStockIn" || vcl.progId == "stk.HalfWeavStockOut"
            || vcl.progId == "stk.NoOrderStockOut" || vcl.progId == "sal.NoOrder"
            || vcl.progId == "stk.HalfStockDetailSelFunc" || vcl.progId == "stk.FPStockDetailSelFunc"
            || vcl.progId == "stk.FpAllocationHandleFunc" || vcl.progId == "pls.Outsourcing"
            || vcl.progId == "stk.HalfProductNoOrder" || vcl.progId == "sal.OrderStateExecutFunc"
            || vcl.progId == "qc.OutWeaveProduct" || vcl.progId == "pm.DormManage" || vcl.progId == "sal.CommissionDiffFunc"
            || vcl.progId == "stk.HalfProfitAndLoss" || vcl.progId == "stk.Claimant"
            || vcl.progId == "axp.Role" || vcl.progId == "axp.PermissionGroupFunc" || vcl.progId == "stk.OutOrderSevenFunc"
            || vcl.progId == "com.UserGroup" || vcl.progId == "qc.ProductCut" || vcl.progId == "stk.HalfProductRepairFunc"
            || vcl.progId == "stk.FinishProductStockOut" || vcl.progId == "stk.HalfDyeStockOut" || vcl.progId == "stk.ProductReturnStockIn"
            || vcl.progId == "stk.NoOrder" || vcl.progId == "qc.OutPurchaseCut" || vcl.progId == "qc.FinishProductAddTwo"
            || vcl.progId == "stk.ReturnWorkShop" || vcl.progId == "stk.FinishProductProfitAndLoss"
            || vcl.progId == "stk.FpAllocationCollectFunc" || vcl.progId == "com.WeavWagesPrice"
            || vcl.progId == "sal.AccountBookFunc" || vcl.progId == "stk.HalfProductStockTotalFunc"
            || vcl.progId == "sal.UpdateOrderPrice" || vcl.progId == "pls.WeavPlanPrintSerialNoFunc" || vcl.progId == "stk_InventoryRepairFunc"
            || vcl.progId == "sal.SaleOrderStateFunc" || vcl.progId == "stk.AutoWareHouseOutPlan" || vcl.progId == "stk.OutOrderNineFunc"
            || vcl.progId == "stk.AutoWareHouseStockProductFunc" || vcl.progId == "pls.PreSendProducePlanOrderChangeFunc"
            || vcl.progId == "sal.UpdateOrderAfterWayRoute" || vcl.progId == "qc_HalfProductFunc" || vcl.progId == "stk.DyeUnEndFunc" || vcl.progId == "stk.OutOrderThreeFunc"
            || vcl.progId == "sal.OrderStateExecutTwoFunc" || vcl.progId == "stk.HalfProductStockInFunc" || vcl.progId == "fin.ARAccountFunc" || vcl.progId == "fin.APAccountFunc") ? "checkboxmodel" : "";
    },

    //2.3：弹出页面的行样式【根据自己项目业务,没有的话,删除不要的代码,直接返回""】
    getGridRowClass: function (vcl, progId, record, rowIndex, rowParams, store) {
        if (vcl.progId == "sp.DyeOrderOverTimeFunc" || vcl.progId == "sp.TwistOrderOverTimeFunc"
            || vcl.progId == "sp.OrderOverTimeFunc" || vcl.progId == "sp.TwistOrderNeedEndFunc"
            || vcl.progId == "sp.DyeOrderNeedEndFunc" || vcl.progId == "sp.OrderNeedEndFunc") {
            return "red";
        }
        else if (vcl.progId == "sp.TwistOrderDetailRpt" || vcl.progId == "sp.DyeOrderDetailRpt"
            || vcl.progId == "sp.PurchaseOrderDetailRpt" || vcl.progId == "stk.DyeUnEndFunc" || vcl.progId =="stk.HalfAfterAccount") {
                        //if (record.data.ISFINISH == 0) {
            //    return "red";
            //}
            if (record.data.State == 1) {
                return "yellow";
            }
            else if (record.data.State == 2) {
                return "red";
            }
        }
        else if (vcl.progId == "pls.WeavPickMaterialRpt") {
            if (record.data.ISEND == 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.StockTotalFunc") {
            if (record.data.PRODUCTSTATE == "已计划发货") {
                return "red";
            }
        }
        else if (vcl.progId == "stk.StockAlarmFunc") {
            if (record.data.AlarmContent == 1) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.FinishProductStockIn") {
            if (record.store.Name == "STKFINISHPRODUCTSTOCKINDETAIL" && record.data.ISEXIST != 0 && record.data.InState != 1) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.ProductReturnStockIn") {
            if (record.data.ISEXIST != 0 && record.data.InState != 1 && record.store.Name == "StkProductReturnStockInDetail") {
                return "red";
            }
        }
        else if (vcl.progId == "Em.PurchaseOrderSummaryFunc") {
            if (record.data.Quantity > record.data.FinishQuantity) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.HalfWeavStockOut") {
            if (record.store.Name == "StkHalfWeavStockOutDETAIL" && record.data.PRODUCTSTATE != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.HalfWeavStockIn") {
            if (record.store.Name == "STKHALFWEAVSTOCKINDETAIL" && record.data.PRODUCTSTATE != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.NoOrderStockOut") {
            if (record.store.Name == "STKNOORDERSTOCKOUTDETAIL" && record.data.STATE != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.GoodsTrafficProductEdit") {
            if (record.store.Name == "StkGoodsTrafficProductEditDETAIL" && record.data.PRODUCTSTATE != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "sp.PurchaseOrderFunc") {
            if (record.data.SELECTED == 1) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.HalfDyeStockOut") {
            if (record.store.Name == "STKHALFDYESTOCKOUTDETAIL" && record.data.PRODUCTSTATE != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.TransferLibrary") {
            if (record.store.Name == "STKTRANSFERLIBRARYDETAIL" && record.data.PRODUCTSTATE == "4") {
                return "red";
            }
        }
        else if (vcl.progId == "stk.ReturnWorkShop") {
            if (record.store.Name == "STKReturnWorkShopDETAIL" && record.data.ISEXIST != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.SampleCloth") {
            if (record.store.Name == "StkSampleClothDetail" && record.data.ISEXIST != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.FinishProductProfitAndLoss") {
            if (record.store.Name == "STKFinishProductProfitAndLossDETAIL" && record.data.ISEXIST != 0) {
                return "red";
            }
        }
        else if (vcl.progId == "stk.FinishProductStockOut") {
            if (record.store.Name == "STKFINISHPRODUCTSTOCKOUTCOMPARISON" && record.data.BOUT == "N") {
                return "red";
            }
        }
        else if (vcl.progId == "stk.FpAllocationCollectFunc") {
            if (record.store.Name == "StkFPStockDetailSelFuncInfo" && record.data.IsExist != 0 && record.data.IsExist != 6) {
                return "red";
            }
            if (record.store.Name == "StkFPStockDetailSelFuncInfo" && record.data.IsExist == 0) {
                return "bom_Semi-finishedProductMatchClass";
            }
        }
        else if (vcl.progId == "pls.PreSendProducePlanOrderChangeFunc") {
            if (record.store.Name == "PlsPreSendProducePlanOrderChangeFuncDetail" && record.data.DEALFLAG == "N") {
                return "red";
            }
        }
        else if (vcl.fontColor) {
            var bacClass = vcl.fontColor
            return bacClass
        }
        return "";
    },



    //3.12：Master+Bill弹出页面的功能按钮[修改]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    editGridBefore: function (progId, vcl) {
        // 【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】
        if (progId == "sal.SaleOrderJF") {
            var personId = Ext.util.Cookies.get("loginPersonId");
            var bEdit = saleOrderEditPower(personId, vcl.dataSet.dataList[0].data.items[0].get("CODEID"));
            if (!bEdit) {
                Ext.Msg.alert("提示", "抱歉，您没有权限修改");
                return false;
            }
        }
        return true;
    },

    //3.13：Master+Bill弹出页面的功能按钮[删除]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    deleteGridBefore: function (progId, vcl) {
        //【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】
        //IsExistSubCustomer 这个业务函数我改过的，返回true 或者 false,升级时如果有这个业务，注意修改
        if (progId == "com.Customer") {
            var batchParams = [];
            batchParams.push(vcl.currentPk[0]);
            var myWin = this;
            IsExistSubCustomer(batchParams, '删除', function () {
                var success = vcl.doDelete(vcl.currentPk);
                if (success) {
                    if (vcl.entryParam == undefined) {
                        if (Ext.getCmp(vcl.progId.replace(".", '')) != undefined) {
                            Ext.getCmp(vcl.progId.replace(".", '')).toolBarAction[1].execute();
                        }
                    }
                    else {
                        if (vcl.entryParam != "") {
                            var entryParam = "";
                            var jsonString = JSON.stringify(vcl.entryParam.ParamStore);
                            jsonString = jsonString.substring(jsonString.indexOf(':') + 1, jsonString.indexOf('}'));
                            var temp = jsonString.split(",");
                            for (var i = 0; i < temp.length; i++) {
                                entryParam = entryParam + temp[i].substring(temp[i].indexOf(":") + 1);
                            }
                        }
                        Ext.getCmp(vcl.progId.replace(".", '') + vcl.entryParam.replace(new RegExp('"', 'gm'), '')).toolBarAction[1].execute();
                    }
                }
                if (success)
                    myWin.up('window').close();
            })
        }
        else if (vcl.progId == "stk.FinishProductStockOut") {
            var myWin = this;
            Ext.Msg.confirm("系统提示", "删除该单据会把相对应的发货单一起删除，确定要删除吗？", function (btn) {
                if (btn == "yes") {
                    var success = vcl.doDelete(vcl.currentPk);
                    if (success) {
                        if (vcl.entryParam == undefined) {
                            if (Ext.getCmp(vcl.progId.replace(".", '')) != undefined) {
                                Ext.getCmp(vcl.progId.replace(".", '')).toolBarAction[1].execute();
                            }
                        }
                        else {
                            if (vcl.entryParam != "") {
                                var entryParam = "";
                                var jsonString = JSON.stringify(vcl.entryParam.ParamStore);
                                jsonString = jsonString.substring(jsonString.indexOf(':') + 1, jsonString.indexOf('}'));
                                var temp = jsonString.split(",");
                                for (var i = 0; i < temp.length; i++) {
                                    entryParam = entryParam + temp[i].substring(temp[i].indexOf(":") + 1);
                                }
                            }
                            Ext.getCmp(vcl.progId.replace(".", '') + vcl.entryParam.replace(new RegExp('"', 'gm'), '')).toolBarAction[1].execute();
                        }
                    }
                    if (success)
                        myWin.up('window').close();
                }
                else { return false; }
            });
        }
        return true;
    },

    //3.14：Master+Bill弹出页面的功能按钮[送审]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    submitAuditGridBefore: function (progId, vcl, callBackHandler) {
        //【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】如果调用过callBackHandler() 请返回false
        if (progId == "sal.SaleOrderJF") {
            var batchParams = [vcl.dataSet.dataList[0].data.items[0].get("BILLNO")];
            VelProductSheetsign(batchParams, callBackHandler);
            return false;
        }
        return true;
    },

    //3.15：Master+Bill弹出页面的功能按钮[生效]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    releaseGridBefore: function (progId, vcl, callBackHandler) {
        //【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】
        /*升级时,复制代码进来后把下面5行代码改成：callBackHandler(),如果每个if里面调用过callBackHandler() 请在最后增加返回 return false;
        success = vcl.doTakeRelease(false);
        if (success)
            vcl.win.close();
        Ext.getCmp(vcl.progId.replace(".", '')).toolBarAction[1].execute();
        setAction(vcl.billType, vcl.isEdit, false);
         */
        if (progId == "pls.OutsourcingPlan") {
            var batchParams = vcl.currentPk[0];
            var result = OutPlanRelase(batchParams);

            if (result.Success) {
                callBackHandler();
            }
            else {
                Ext.Msg.confirm("系统提示", "安排数量低于起订量，请确认是否下单？", function (btn) {
                    if (btn == "yes") {
                        callBackHandler();
                    }
                });
            }
            return false;
        }
        //发货通知单生效
        else if (progId == "stk.ProductSendNotice") {
            var result = VelCustCredit(vcl.dataSet.dataList[0].data.items[0].data.SheetId);
            if (!result.Success) {
                Ext.Msg.confirm("系统提示", result.Message + ",确定要生效吗？", function (btn) {
                    if (btn == "yes") {
                        callBackHandler();
                    }
                });
            }
            else {
                callBackHandler();
            }
            return false;
        }
        //采购单生效
        else if (vcl.progId == "sp.PurchaseOrder") {
            var result = VelMaterialMiniNum(vcl.dataSet.dataList[0].data.items[0].data.BILLNO);
            if (!result.Success) {
                Ext.Msg.confirm("系统提示", result.Message + ",确定要生效吗？", function (btn) {
                    if (btn == "yes") {
                        callBackHandler();
                    }
                });
            }
            else {
                callBackHandler();
            }
            return false;
        }
        return true;
    },

    //3.16：Master+Bill弹出页面的顶部功能按钮,和返回那些按钮，放在这,参数都传过来了
    //新增addNew、修改edit、删除deleteBill、送审submitAudit、审核audit、生效release、作废invalid、结案endCase、存为草稿saveToDraft、提交submitDraft、撤销cancel、清单returnListing、刷新refresh、导入importData、导出exportData、打印print、审核流程flow、附件attachment、保存方案saveDisplayScheme、
    createBillAction: function (addNew, edit, deleteBill, submitAudit, audit, release, invalid, endCase, saveToDraft, submitDraft, cancel, returnListing, refresh, importData, exportData, print, flow, attachment, saveDisplayScheme, vcl, permission, isF4) {
        var items;
        if (vcl.billType == BillTypeEnum.Master) {
            if (isF4 === true)
                items = [addNew, edit, saveToDraft, submitDraft, cancel, refresh, deleteBill, submitAudit, audit, flow, importData, exportData, print, attachment, saveDisplayScheme];
            else
                items = [addNew, edit, saveToDraft, submitDraft, cancel, refresh, deleteBill, submitAudit, audit, flow, importData, exportData, print, attachment, saveDisplayScheme];
        } else {
            if (isF4 === true)
                items = [addNew, edit, saveToDraft, submitDraft, cancel, refresh, submitDraft, deleteBill, release, invalid, submitAudit, audit, flow, endCase, importData, exportData, print, attachment, saveDisplayScheme];
            else
                if (vcl.progId == "stk.FinishProductStockOut") {
                    items = [addNew, edit, saveToDraft, submitDraft, cancel, refresh, submitDraft, deleteBill, invalid, submitAudit, audit, flow, endCase, importData, exportData, print, attachment, saveDisplayScheme];
                }
                else if (vcl.progId == "stk.FinishProductPrintCode") {
                    items = [addNew, edit, saveAndBigPrint, saveAndSmaillPrint, saveToDraft, submitDraft, cancel, refresh, submitDraft, deleteBill, release, invalid, submitAudit, audit, flow, endCase, importData, exportData, print, attachment, saveDisplayScheme];
                }
                else {
                    items = [addNew, edit, saveToDraft, submitDraft, cancel, refresh, submitDraft, deleteBill, release, invalid, submitAudit, audit, flow, endCase, importData, exportData, print, attachment, saveDisplayScheme];
                }
        }
        return items;
    },




    //3.17：报表Rpt[打印]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    printRptBefore: function (progId, vcl) {
        // 【如果可行的话 可以考虑换个方式】每个if最后请返回false
        if (vcl.progId == "stk.MaterialAccountDetailRpt") {
            //var data = vcl.dataSet.dataList[0];
            var data = vcl.dataSet.getTable(0).data.items;
            var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
            var printhtml = `<table border=0 cellpadding = 0 cellspacing = 0           style="
                                                border-top: 1px solid #000;
                                                border-left: 1px solid #000;
                                                text-align:center;
                                      " >`
            printhtml += `<tr><td
                                   style= "padding: 0px 2px;border-bottom: 1px solid #000;border-top: 1px solid #000;border-right: 1px solid #000;width: 60px;font-size: 22px;text-align:center"  colspan ="5";>
                                    杭 州 众 望 布 艺 有 限 公 司
                                  </td>
                                </tr >`;
            printhtml += `<tr>
                                    <td
                                      style="
                                        padding: 0px 2px;
                                        border-bottom: 1px solid #000;
                                        border-top: 1px solid #000;
                                        border-right: 1px solid #000;
                                        width: 100px;
                                        text-align:center;
                                      "
                                    >
                                      <span style="white-space: nowrap">原料名称</span>
                                    </td>
                                    <td
                                      style="
                                        padding: 0px 2px;
                                        border-bottom: 1px solid #000;
                                        border-top: 1px solid #000;
                                        border-right: 1px solid #000;
                                        width: 50px;
                                        text-align:center;
                                      ">
                                      <span style="white-space: nowrap">库位</span>
                                    </td>
                                    <td
                                      style="
                                        padding: 0px 2px;
                                        border-bottom: 1px solid #000;
                                        border-top: 1px solid #000;
                                        border-right: 1px solid #000;
                                        width: 150px;
                                        text-align:center;
                                      "
                                    >
                                      <span style="white-space: nowrap; overflow: hidden"> 缸号</span>
                                    </td>
                                    <td
                                      style="
                                        padding: 0px 2px;
                                        border-bottom: 1px solid #000;
                                        border-top: 1px solid #000;
                                        border-right: 1px solid #000;
                                        width: 50px;
                                        text-align:center;
                                      "
                                    >
                                      <span style="white-space: nowrap; overflow: hidden">数量</span
                                      >
                                    </td>
                                    <td
                                      style="
                                        padding: 0px 2px;
                                        border-bottom: 1px solid #000;
                                        border-top: 1px solid #000;
                                        border-right: 1px solid #000;
                                        width: 100px;
                                        text-align:center;
                                      ">
                                      <span style="white-space: nowrap; overflow: hidden">备注</span>
                                    </td>
                                  </tr>`;
            //LODOP.PRINT_INITA(0, 0, "100%", "100%", "打印控件功能演示_Ext");
            for (var i = 0; i < data.length; i++) {
                printhtml +=
                    `        <tr>
                                        <td
                                          style="
                                            padding: 0px 2px;
                                            border-bottom: 1px solid #000;
                                            border-top: 1px solid #000;
                                            border-right: 1px solid #000;
                                            width: 100px;
                                            text-align: left;
                                          "
                                        >
                                          <span style="white-space: nowrap; overflow: hidden">${data[i].get("MATERIALNAME")}</span>
                                        </td>
                                        <td
                                          style="
                                            padding: 0px 2px;
                                            border-bottom: 1px solid #000;
                                            border-top: 1px solid #000;
                                            border-right: 1px solid #000;
                                            width: 50px;
                                            text-align: right;
                                          "
                                        >
                                          <span style="white-space: nowrap; overflow: hidden">${data[i].get("STORAGEID")}</span>
                                        </td>
                                        <td
                                          style="
                                            padding: 0px 2px;
                                            border-bottom: 1px solid #000;
                                            border-top: 1px solid #000;
                                            border-right: 1px solid #000;
                                            width: 150px;
                                            text-align: right;
                                          "
                                        >
                                          <span style="white-space: nowrap; overflow: hidden">${data[i].get("SUBBATCHNO")}</span>
                                        </td>
                                        <td
                                          style="
                                            padding: 0px 2px;
                                            border-bottom: 1px solid #000;
                                            border-top: 1px solid #000;
                                            border-right: 1px solid #000;
                                            width: 50px;
                                            text-align: right;
                                          "
                                        >
                                          <span style="white-space: nowrap; overflow: hidden">${data[i].get("QUANTITY")}</span>
                                        </td>
                                        <td
                                          style="
                                            padding: 0px 2px;
                                            border-bottom: 1px solid #000;
                                            border-top: 1px solid #000;
                                            border-right: 1px solid #000;
                                            width: 100px;
                                            text-align: right;
                                          "
                                        >
                                          <span style="white-space: nowrap; overflow: hidden">${data[i].get("PURREMARK")}</span>
                                        </td>
                                      </tr>`;
            }
            printhtml += "</table >";
            LODOP.ADD_PRINT_HTM(10, 50, "100%", "100%", printhtml);
            LODOP.SET_PRINT_STYLE("FontSize", 10);
            //LODOP.SET_PRINT_STYLEA(1, "FontSize", 9);
            //LODOP.SET_PRINT_STYLEA(2, "FontSize", 9);
            //LODOP.ADD_PRINT_BARCODE(3, 10, 105, 105, "QRCode", 1);
            //LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 4);
            LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小
            //LODOP.ADD_PRINT_TEXT(226, 2, 276, 112, "@StorageID");
            LODOP.PREVIEW();
            //window.document.body.innerHTML = printhtml;
            //window.print(); 
            return false;
        }
        return true;
    },

    //3.18：Rpt顶部功能按钮,传过来的是按钮数组,没有的话,删除不要的代码，自定义按钮在后面追加
    createRptAction: function (items, progId, vcl) {
        if (progId == "qc.FinishProductDetailRpt") {
            //设置条码号作废
            var siteBarCodeCancel = Ext.create(Ext.Action, {
                text: '作废条码号',
                iconCls: 'fa fa-cloud-upload',
                handler: function () {
                    var batchParams = [];
                    var records = vcl.dataSet.dataList[0].data.items;
                    if (records.length > 0) {
                        for (var i = 0; i < records.length; i++) {
                            if (records[i].get("ISSELECT")) {
                                var value = records[i].get("NEWSERIALNO");
                                batchParams.push(value);
                            }
                        }
                        if (batchParams.length > 0) {
                            call.apply(this);
                        }
                        else {
                            Ext.Msg.alert("提示", "请选择数据");
                        }
                    }
                    else {
                        Ext.Msg.alert("提示", "没有数据");
                    }
                    function call() {
                        Ext.Msg.confirm("系统提示", "您确定作废条码号：" + batchParams.join(",") + "吗？", function (btn) {
                            if (btn == "yes") {

                                Ext.Ajax.request({
                                    url: '/api/finishproductstock/BarCodeCancel',
                                    jsonData: { batchParams: batchParams },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (!result.Success) {
                                            Ext.Msg.alert("提示", result.Message);

                                        }
                                        else {
                                            Ext.Msg.alert("提示", "操作成功！");
                                            vcl.showRpt(vcl.queryCondition);
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });

                            }
                        });
                    }
                }
            });

            //导出LZB码单
            var exportLzbBarCode = Ext.create(Ext.Action, {
                text: '导出LZB码单',
                iconCls: 'fa fa-cloud-upload',
                handler: function () {
                    var batchParams = [];
                    var records = vcl.dataSet.dataList[0].data.items;
                    if (records.length > 0) {
                        for (var i = 0; i < records.length; i++) {
                            var value = records[i].get("NEWSERIALNO");
                            batchParams.push(value);
                        }
                        call.apply(this);
                    }
                    else {
                        Ext.Msg.alert("提示", "没有数据");
                    }
                    function call() {
                        Ext.Ajax.request({
                            url: '/api/finishproductstock/printqcproductlzb',
                            jsonData: { batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            var date = new Date();

                                            var year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
                                            var month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
                                            var day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)

                                            window.location.href = '/TempData/FinishProductStockOut/LzbCode/' + year + month + '/' + day + '/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            });


            items.push(exportLzbBarCode);
            items.push(siteBarCodeCancel);
        }
        return items;
    },




    //3.3：Master+Bill主列表功能按钮[修改]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    editBefore: function (progId, record) {
        // 【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】
        if (progId == "sal.SaleOrderJF") {
            var personId = Ext.util.Cookies.get("loginPersonId");
            var bEdit = saleOrderEditPower(personId, record.data.CODEID);
            if (!bEdit) {
                Ext.Msg.alert("提示", "抱歉，您没有权限修改");
                return false;
            }
            //20240822注释，需要考虑销售订单会选择审核之后仍可以修改的设定，也就是这边加逻辑需要增加审核流配置的判断条件
            //if (record.data.CURRENTSTATE == 2 || record.data.CURRENTSTATE == 4) {
            //    Ext.Msg.alert("提示", "销售订单已生效或者已结案无法修改");
            //    return false;
            //}
        }
        return true;
    },

    //3.4：Master+Bill主列表功能按钮[删除]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    deleteBefore: function (progId, gridPanel) {
        //【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】
        //IsExistSubCustomer 这个业务函数我改过的，返回true 或者 false,升级时如果有这个业务，注意修改
        if (progId == "com.Customer") {
            //var records = gridPanel.getView().getSelectionModel().getSelection();
            //if (records.length > 0) {
            //    var batchParams = [];
            //    for (var i = 0; i < records.length; i++) {
            //        batchParams.push(records[i].get("CUSTOMERID"));
            //    }
            //    return IsExistSubCustomer(batchParams, '删除');
            //}
            //else {
            //    Ext.Msg.alert("提示", "未选择数据");
            //    return false;
            //}
        }
        else if (progId == "stk.FinishProductStockOut") {
            Ext.Msg.confirm('系统提示', '删除该单据会把相对应的发货单一起删除，确定要删除吗？', function (btn) {
                if (btn === 'yes') {
                    invorkBatchBcf('Delete', undefined, function (errPks) {
                        var records = gridPanel.getView().getSelectionModel().getSelection()
                        if (records.length > 0) {
                            var count = gridPanel.Pks.length;
                            for (var i = records.length - 1; i >= 0; i--) {
                                var pk = []
                                for (var r = 0; r < count; r++) {
                                    var pkStr = gridPanel.Pks[r]
                                    var value = records[i].get(pkStr)
                                    pk.push(value)
                                }
                                if (errPks.length > 0) {
                                    for (var m = errPks.length - 1; m >= 0; m--) {
                                        var same = true
                                        for (var n = 0; n < count; n++) {
                                            if (errPks[m][n] != pk[n]) {
                                                same = false
                                                errPks.pop(errPks[m])
                                                break
                                            }
                                        }
                                        if (!same)
                                            gridPanel.store.remove(records, true)
                                    }
                                } else {
                                    gridPanel.store.remove(records, true)
                                }

                            }
                        }
                    })
                    getBillListing();
                }
                else { return false; }
            })
        }
        return true;
    },

    //3.5：Master+Bill主列表功能按钮[送审]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    submitAuditBefore: function (progId, gridPanel, callBackHandler) {
        //【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】如果调用过callBackHandler() 请返回false
        if (progId == "sal.SaleOrderJF") {
            var records = gridPanel.getView().getSelectionModel().getSelection();
            var batchParams = [];
            for (var i = 0; i < records.length; i++) {
                batchParams.push(records[i].get("BILLNO"));
            }

            VelProductSheetsign(batchParams, callBackHandler);
            return false;
        }
        return true;
    },

    //3.6：Master+Bill主列表功能按钮[生效]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    releaseBefore: function (progId, gridPanel, callBackHandler) {
        //【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】
        /*升级时,复制代码进来后把下面2行代码改成：callBackHandler(),如果每个if里面调用过callBackHandler() 请在最后增加返回 return false;
         invorkBatchBcf("TakeRelease", false);
         getBillListing();
         */
        if (progId == "pls.OutsourcingPlan") {
            var bState = true;
            var batchParams = "";
            var currentState = 0;
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                for (var i = 0; i < records.length; i++) {
                    //batchParams = records[0].get("BILLNO");
                    currentState = records[0].get("CURRENTSTATE");
                    if (currentState == 4) {
                        Ext.Msg.alert("提示", "单据号" + records[i].get("BILLNO") + "状态为结案，不能生效");
                        bState = false;
                        break;
                    }
                    if (currentState == 2) {
                        Ext.Msg.alert("提示", "单据号" + records[i].get("BILLNO") + "状态已生效");
                        bState = false;
                        break;
                    }
                }
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
            }
            if (bState) {
                for (var i = 0; i < records.length; i++) {
                    var result = OutPlanRelase(records[i].get("BILLNO"));
                    if (result.Success) {
                        callBackHandler();
                    }
                    else {
                        Ext.Msg.confirm("系统提示", "安排数量低于起订量，请确认是否下单？", function (btn) {
                            if (btn == "yes") {
                                callBackHandler();
                            }
                        });
                    }
                }
            }
            return false;
        }
        else if (progId == "stk.FinishProductStockIn" || progId == "sal.CollectionAmountOrder") {
            var bState = false;
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 1) {
                Ext.Msg.alert("提示", "只能选择一条数据");
            }
            else if (records.length > 0) {
                bState = true;
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
            }
            if (bState) {
                callBackHandler();
            }
            return false;
        }
        else if (progId == "stk.FinishProductStockOut") {
            var bState = false;
            var batchParams = "";
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 1) {
                Ext.Msg.alert("提示", "只能选择一条数据");
            }
            else if (records.length > 0) {
                batchParams = records[0].get("SHEETID");
                bState = true;
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
            }
            if (bState) {

                var result = FinishProductStockOutRelase(gridPanel, batchParams);

                if (!result.Success) {

                    Ext.Msg.confirm("系统提示", result.Message + ",确定要出库吗？", function (btn) {
                        if (btn == "yes") {
                            callBackHandler();
                        }
                    });

                }
                else {
                    callBackHandler();
                }
            }
            return false;
        }
        else if (progId == "stk.ProductSendNotice") {
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length == 0) {
                Ext.Msg.alert("提示", "请选择单据");
            }
            else {
                for (var i = 0; i < records.length; i++) {
                    var result = VelCustCredit(records[i].get("SheetId"));
                    if (!result.Success) {
                        Ext.Msg.confirm("系统提示", result.Message + ",确定要生效吗？", function (btn) {
                            if (btn == "yes") {
                                callBackHandler();
                            }
                        });
                    }
                    else {
                        callBackHandler();
                    }
                }
            }
            return false;
        }
        else if (progId == "sp.PurchaseOrder") {
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length == 0) {
                Ext.Msg.alert("提示", "请选择单据");
            }
            else {
                for (var i = 0; i < records.length; i++) {
                    var result = VelMaterialMiniNum(records[i].get("BILLNO"));
                    if (!result.Success) {
                        Ext.Msg.confirm("系统提示", result.Message + ",确定要生效吗？", function (btn) {
                            if (btn == "yes") {
                                callBackHandler();
                            }
                        });
                    }
                    else {
                        callBackHandler();
                    }
                }
            }
            return false;
        }
        else if (progId == "sp.TwistOrder") {
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length == 0) {
                Ext.Msg.alert("提示", "只能选择一条数据");
            }
            else {
                for (var i = 0; i < records.length; i++) {
                    var result = VelDyeISFINISH(records[i].get("BILLNO"));
                    if (!result.Success) {
                        Ext.Msg.confirm("系统提示", result.Message + ",是否生效？", function (btn) {
                            if (btn == "yes") {
                                callBackHandler();
                            }
                        });
                    }
                    else {
                        callBackHandler();
                    }
                }
            }
            return false;
        }
        return true;
    },

    //3.7：Master+Bill主列表功能按钮[反生效]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回true】
    backreleaseBefore: function (progId, gridPanel, callBackHandler) {
        //【如果可行的话 可以考虑把接口代码 改到Bcf里面 这里直接返回true就行】
        /*升级时,复制代码进来后把下面2行代码改成：callBackHandler(),如果调用过callBackHandler() 请返回false
         invorkBatchBcf("TakeRelease", true);
         getBillListing();
         */
        if (progId == "stk.PurMaterialStockIn" || progId == "stk.PurMaterialStockReturn" || progId == "stk.ProofingStockOut" || progId == "stk.ProofingStockReturn" ||
            progId == "stk.MaterialLoss" || progId == "stk.TakeawayStockOut" || progId == "stk.OutsourcingStockOut" ||
            progId == "stk.OutsourcingStockIn" || progId == "stk.OutsourcingStockReturn" || progId == "stk.OutsourcingStockLoss" ||
            progId == "stk.OutsourcingClaimant" || progId == "stk.WarpStockOut" || progId == "stk.WarpStockReturn" || progId == "stk.WeavStockOut" || progId == "stk.WeavStockReturn" ||
            progId == "stk.OtherMaterialStockOut" || progId == "stk.OtherMaterialStockIn" || progId == "stk.LossCloth" || progId == "stk.HalfAllocation") {
            var ex = [];
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                for (var i = 0; i < records.length; i++) {
                    var BILLNO ="";
                    if (progId == "stk.LossCloth") {
                        BILLNO = records[0].get("SheetId");
                    }
                    else {
                        BILLNO = records[0].get("BILLNO");
                    }
                    var FinanceConfirm = records[i].get("FinanceConfirm");
                    if (FinanceConfirm == 1) {
                        ex.push({ kind: 2, msg: '单据【' + BILLNO + '】已财务确认，不能反生效！' });
                    }
                }
            }
            if (ex.length > 0)
                Ax.utils.LibMsg.show(ex);
            else {
                callBackHandler();
            }
            return false;
        }
        return true;
    },

    //3.8：Master+Bill主列表功能按钮[导出选择 项]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回/billSvc/invorkBatchExport】
    exportDataItemBefore: function (progId) {
        //【建议都使用20240704的新导出】
        //if (progId == "stk.FinishProductStockDetail") {   //飞飞框架原始代码，后续标准版改掉注释
        //    return "/api/finishproductstock/StkFinishProductPrintSel";
        //}
        if (progId == "qc.FinishProductDefect") {
            return "/api/qccheckfinishproduct/QcFinishProductDefectPrintSel";
        }
        else if (progId == "pm.PersonData") {
            return "/api/PersonData/ExportSel";
        }
        else if (progId == "ds.GuidePrice") {
            return "/api/design/ExportGuidePrice";
        }
        else if (progId == "stk.AccountDetail") {
            exportUrl = "/api/materialmanagement/ExportAccountDetail";
        }
        else if (progId == "stk.FinishProductStockDetail") {
            return "/api/finishproductstock/ExportFinishProductStockDetail";
        }
        else if (progId == "stk.HalfAccountDetail") {
            return "/api/halfproductmanagement/ExprotHalfProductSel";
        }
        else if (progId == "pls.WeavPlan") {
            return "/api/production/ExportPlsWeavPlanSel";
        }
        else if (progId == "sal.SaleOrderLabel") {
            return "/api/printlabel/ExportPrintLabelInfo";
        }
        else if (progId == "Em.EquipInventory") {
            return "/api/EmEquipment/ExportEmEquipmentDetail";
        }
        return '/billSvc/invorkBatchExport';
    },

    //3.9：Master+Bill主列表功能按钮[导出选择 项]后事件【根据自己项目业务,没有的话,删除不要的代码,直接返回""】
    exportDataItemAfter: function (progId, result) {
        //【建议都使用20240704的新导出】
        if (progId == "qc.FinishProductDefect" || progId == "pm.PersonData" || progId == "ds.GuidePrice" || progId == "stk.AccountDetail"
            || progId == "stk.FinishProductStockDetail" || progId == "stk.HalfAccountDetail" || progId == "pls.WeavPlan"
            || progId == "sal.SaleOrderLabel" || progId == "Em.EquipInventory") {
            return result.ExportAllDataResult;
        }
        return "";
    },

    //3.10：Master+Bill主列表功能按钮[导出全部 老导出]前事件【根据自己项目业务,没有的话,删除不要的代码,直接返回/billSvc/exportAllData】
    exportDataAllBefore: function (progId) {
        //【建议都使用20240704的新导出】
        if (progId === "pls.WeavPlan") {
            //exportAllUrl = "/api/planmanagement/WeaVPlanMainTbPrint";
            //2024020修改
            return "/api/production/ExportPlsWeavPlan";
        }
        else if (progId == "stk.HalfAccountDetail") {
            return "/api/halfproductmanagement/ExprotHalfProduct";
        }
        else if (progId == "stk.FinishProductStockInOut") {
            return "/api/finishproductstock/ExprotFinishProductInOutData";
        }
        else if (progId == "Em.MaterialInOutStock") {
            return "/api/EmMaterial/EmMaterialInOutStockMainTbPrint";
        }
        else if (progId == "qc.HalfProductDefec") {
            return "/api/qchalfproduct/QcHalfProductDefectPrint";
        }
        else if (progId == "qc.FinishProductDefect") {
            return "/api/qccheckfinishproduct/QcFinishProductDefectPrint";
        }
        else if (progId == "pm.PersonData") {
            return "/api/PersonData/ExportAll";
        }
        else if (progId == "ds.GuidePrice") {
            return "/api/design/ExportAll";
        }
        else if (progId == "stk.AccountDetail") {
            return "/api/materialmanagement/ExportAccountDetailAll";
        }
        else if (progId == "stk.FinishProductStockDetail") {
            return "/api/finishproductstock/ExportFinishProductStockDetailAll";
        }
        else if (progId == "sal.SaleOrderLabel") {
            return "/api/printlabel/ExportPrintLabelAll";
        }
        else if (progId == "Em.EquipInventory") {
            return "/api/EmEquipment/ExportEmEquipmentDetailAll";
        }
        return '/billSvc/exportAllData';
    },

    //3.19：Master+Bill主列表[修改]事件前分析，生效后不能修改的功能号【不在这里面的功能号,主列表中的[修改]可以弹出修改页面】
    releaseNotEdit: function () {
        return ["sp.DyeOrder", "sp.TwistOrder", "sp.PurchaseOrder", "stk.FinishProductOffset", "qc.OutPurchase", "qc.HalfProduct", "qc.HalfProductWorkerUser", "pls.WeavPlan", "ds.GuidePrice"
        ];
    },

    //3.11：Master+Bill主列表顶部功能按钮,的自定义按钮,和返回那些按钮，放在这,参数都传过来了
    //下面是众望项目2023年的 LibToolBarBuilder.js 自己写的自定义按钮 转移动过来的 因每个项目都不一样 首次升级时 必须根据自己项目的JS 从新整理一次！！！
    //【根据自己项目业务,没有的话,删除不要的代码,如果有增加在这里面增加】
    createBillListingAction: function (select, batchEditForm, refresh, browse, addNew, edit, deleteBill, submitAudit, retract, audit, release, backrelease, invalid, endCase, returnListing, upPage, downPage, importData, exportData, setSearchScheme, saveDisplayScheme, progId, billType, displayText, permission, gridPanel, filterCbo, compareCbo, compareTxt, dateCbo, filterFun, entryParam, gridInfoPanel, sumFieldsHtml) {
        var items;
        function getBillListing() {
            var curStore = gridPanel.getStore();
            if (queryCondition != undefined && queryCondition != null) {
                curStore.where = queryCondition;
            }
            curStore.loadPage(1);
        }

        //#region 自定义按钮 代码开始
        //导出V1
        var exportDataV1 = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            text: '导出',
            iconCls: 'fa fa-upload',
            /*hidden: contains(permissionList, 16384, false, 'exportData', defineItems),*/
            handler: function () {
                var columnsNames = {};
                var batchParams = [];
                for (var i = 0; i < gridPanel.columnManager.columns.length; i++) {
                    var columnName = gridPanel.columnManager.columns[i].dataIndex;
                    var columnNameEx = gridPanel.columnManager.columns[i].text;
                    var hidden = gridPanel.columnManager.columns[i].hidden;
                    if (!columnName || columnName == '' || !columnNameEx || columnNameEx == '' || hidden)
                        continue;
                    columnsNames[columnName] = columnNameEx;
                }
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = {};
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk[pkStr] = value;
                            //pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    var exportUrl = '/api/planmanagement/ExportData';
                    Ext.Ajax.request({
                        url: exportUrl,
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, columnsNames: columnsNames },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            var fileName = result.ExportAllDataResult;
                            if (fileName && fileName !== '') {
                                DesktopApp.IgnoreSkip = true;
                                try {
                                    window.location.href = '/TempData/ExportData/' + fileName;
                                } finally {
                                    DesktopApp.IgnoreSkip = false
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            },
            menu: [{
                text: '导出全部',
                handler: function () {
                    var columnsNames = {};
                    for (var i = 0; i < gridPanel.columnManager.columns.length; i++) {
                        var columnName = gridPanel.columnManager.columns[i].dataIndex;
                        var columnNameEx = gridPanel.columnManager.columns[i].text;
                        var hidden = gridPanel.columnManager.columns[i].hidden;
                        if (!columnName || columnName == '' || !columnNameEx || columnNameEx == '' || hidden)
                            continue;
                        columnsNames[columnName] = columnNameEx;
                    }
                    var pkStr = '';
                    var filter = filterFun();
                    var count = gridPanel.Pks.length;
                    for (var r = 0; r < count; r++) {
                        var str = r == 0 ? 'A.' + gridPanel.Pks[r] : ',A.' + gridPanel.Pks[r];
                        pkStr += str;
                    }
                    function call() {
                        var exportAllUrl = "/api/planmanagement/ExportDataAll";
                        Ext.Ajax.request({
                            url: exportAllUrl,
                            jsonData: { handle: UserHandle, progId: progId, pkStr: pkStr, listingQuery: { Handle: UserHandle, ProgId: progId, Condition: queryCondition, TimeFilter: dateCbo.getValue(), Filter: filter, EntryParam: entryParam }, columnsNames: columnsNames },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                var fileName = result.ExportAllDataResult;
                                if (fileName && fileName !== '') {
                                    window.location.href = '/TempData/ExportData/' + fileName;
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                    call.apply(this);
                }
            }]
        });

        //打印
        var print = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            text: '打印',
            iconCls: 'fa fa-print',
            hidden: false,
            //hidden: contains(permissionList, 32768, false, 'print', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                var can = true;
                                if (progId == "pls.WeavPlan")//判断是任务书，先判断任务书是否生效
                                {
                                    if (records.length == 1 || records.length == 2) {
                                        var count = gridPanel.Pks.length;
                                        var weavno = "";
                                        for (var i = 0; i < records.length; i++) {
                                            for (var r = 0; r < count; r++) {
                                                //if (records[i].get("CURRENTSTATE") != 2) {
                                                weavno += records[i].get("WEAVNO") + ",";
                                                can = false;
                                                //}
                                            }
                                        }
                                        //if (can == false) {
                                        //    Ext.Msg.alert("提示", weavno.substring(0, weavno.length - 1) + "任务书号暂未生效");
                                        //    return false;
                                        //}
                                    }
                                    else if (records.length == 0) {
                                        Ext.Msg.alert("提示", "未选择数据");
                                    }
                                    else { Ext.Msg.alert("提示", "只能选择1个或者2个任务书打印"); }
                                }
                                else if (progId == "pls.WarpPracticable")//整经落实
                                {
                                    if (records.length == 1) {
                                        var count = gridPanel.Pks.length;
                                        var CURRENTSTATE = records[0].get("CURRENTSTATE")
                                        var BILLNO = records[0].get("BILLNO");
                                        //if (CURRENTSTATE != 2) {
                                        //    can = false;
                                        //}
                                        //if (can == false) {
                                        //    Ext.Msg.alert("提示", BILLNO + "整经计划号暂未生效");
                                        //    return false;
                                        //}
                                    }
                                    else if (records.length == 0) {
                                        Ext.Msg.alert("提示", "未选择数据");
                                    }
                                }
                                else if (progId == "sal.SaleOrderJF") {
                                    can = false;
                                    printSaleOrder(batchParams);
                                }
                                else if (progId == "stk.HalfWeavStockOut" || progId == "stk.HalfDyeStockOut") {
                                    can = false;
                                    var records = gridPanel.getView().getSelectionModel().getSelection();
                                    if (records.length <= 0) {
                                        Ext.Msg.alert("提示", "请选择单据");
                                    }
                                    else {
                                        var Ids = [];
                                        var personId = Ext.util.Cookies.get("loginPersonId");
                                        for (var i = 0; i < records.length; i++) {
                                            Ids.push(records[i].get("BILLNO"));
                                        }
                                        var data = { progId: progId, paramValue: Ids, personId: personId, buttonId: "ExportStkHalfWeavStockOutExcel" };
                                        Ext.Ajax.request({
                                            url: 'api/StkHalfWeavStockOut/ExportStkHalfWeavStockOutExcel',
                                            jsonData: data,
                                            method: 'POST',
                                            async: false,
                                            timeout: 90000000,
                                            success: function (response) {
                                                var result = Ext.decode(response.responseText);
                                                if (!result.Success) {
                                                    Ext.Msg.alert("提示", result.Message);
                                                }
                                                else {
                                                    var fileName = result.Enttity;
                                                    if (fileName && fileName !== '') {
                                                        DesktopApp.IgnoreSkip = true;
                                                        try {
                                                            window.location.href = '/TempData/WeavStockOut/ExportStkHalfWeavStockOutExcel/' + fileName;
                                                        } finally {
                                                            DesktopApp.IgnoreSkip = false
                                                        }
                                                    }
                                                }
                                            },
                                            failure: function (response) {
                                                Ext.Msg.alert("提示", "方法调用失败");
                                            }
                                        });

                                    }
                                }
                                //半成品发出
                                else if (progId == "stk.HalfProductSendOut") {
                                    can = false;
                                    var url = "api/halfproductmanagement/GetHalfProductSendOutInfo";
                                    exportCommonFunc(url, 0, "TempData/HalfProduct/HalfProductSendOutInfo", "HPSendOutProductInfo", "BILLNO");
                                }
                                //设备物料入库单
                                else if (progId == "Em.InboundOrder") {
                                    can = false;
                                    var url = "api/EmInboundOrder/GetEmInboundOrderProductInfo";
                                    exportCommonFunc(url, 0, "TempData/EmInboundOrder/EmInboundOrderProductInfo", "EmInboundOrderProductInfo", "InBoundOrderNo");
                                }
                                //半成品损益
                                else if (progId == "stk.HalfProfitAndLoss") {
                                    can = false;
                                    var url = "api/halfproductmanagement/GetHalfProfitAndLossProduct";
                                    exportCommonFunc(url, 0, "TempData/HalfProfitAndLoss/HalfProfitAndLossProduct", "HalfProfitAndLossProductInfo", "BILLNO");
                                }
                                //色织布收回
                                else if (progId == "stk.HalfWeavStockIn") {
                                    can = false;
                                    var url = "api/halfproductmanagement/GetWeavStockInProductInInfo";
                                    exportCommonFunc(url, 0, "TempData/HalfProductIn/HalfProductInProduct", "HalfWeavStockInProductInfo", "BILLNO");
                                }
                                //染色布收回导出信息（染色布收回）
                                else if (progId == "stk.HalfDyeStockIn") {
                                    can = false;
                                    var url = "api/halfproductmanagement/GetDyeStockInProductInInfo";
                                    exportCommonFunc(url, 0, "TempData/HalfProductIn/HalfProductInProduct", "HalfDyeStockInProductInfo", "BILLNO");
                                }
                                //剪样布导出信息（剪样布）
                                else if (progId == "stk.SampleCloth") {
                                    can = false;
                                    var url = "api/StkSampleCloth/GetSampleClothProduct";
                                    exportCommonFunc(url, 0, "TempData/SampleCloth/SampleClothProduct", "SampleClothProduct", "SHEETID");
                                }
                                //成品入库单导出信息（成品入库单）
                                else if (progId == "stk.FinishProductStockIn") {
                                    can = false;
                                    var url = "api/finishproductstock/GetFinishProductInInfo";
                                    exportCommonFunc(url, 0, "TempData/FinishProductIn/FinishProductInProduct", "FPStockInProduct", "SHEETID");
                                }
                                //退货通知单
                                else if (progId == "stk.ReturnGoodsNotice") {
                                    can = false;
                                    var url = "api/StkReturnGoods/GetReturnGoodsInfo";
                                    exportCommonFunc(url, 0, "TempData/ReturnGoodsNotice/ReturnGoodsNoticeProduct", "ReturnGoodsInfo", "SheetId");
                                }
                                //无单销售出库
                                else if (progId == "stk.NoOrderStockOut") {
                                    can = false;
                                    var url = "api/StkNoOrderStockOut/GetNoOrderProduct";
                                    exportCommonFunc(url, 0, "TempData/NoOrderStockOut/NoOrderStockOutProduct", "NoOrderStockOut", "SHEETID");
                                }
                                //外购退货单
                                else if (progId == "qc.OutPurchaseReturn") {
                                    can = false;
                                    var url = "api/qcoutsourcet/ExportOutPurcaseReturnExcel";
                                    exportCommonFunc(url, 0, "TempData/OutPurcaseReturn/ExportOutPurcaseReturnExcel", "OutPurcaseReturn", "SHEETID");
                                }
                                //试样任务单
                                else if (progId == "ds.SampleSheet") {
                                    can = false;
                                    var url = "api/design/PrintSampleSheetInfo";
                                    exportCommonFunc(url, 0, "TempData/SampleSheet/SampleSheets", "BtnSampleSheet", "BILLNO");
                                }
                                if (can) {
                                    Ext.Ajax.request({
                                        url: '/api/print/printpdf',
                                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                        method: 'POST',
                                        async: false,
                                        timeout: 90000000,
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText);
                                            if (result.Message != null) {
                                                Ext.Msg.alert("提示", result.Message);
                                                getBillListing();
                                            }
                                            else {
                                                var fileName = result;
                                                if (fileName && fileName !== '') {
                                                    DesktopApp.IgnoreSkip = true;
                                                    try {
                                                        //window.location.href = fileName.Result;
                                                        window.open(fileName.Result);
                                                    } finally {
                                                        DesktopApp.IgnoreSkip = false
                                                    }
                                                }
                                            }
                                        },
                                        failure: function (response) {
                                            Ext.Msg.alert("提示", "方法调用失败");
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }


            },
            menu: [{
                text: '导出excel',
                handler: function () {
                    var batchParams = [];
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length == 1) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[0].get(pkStr);
                        pk.push(value);

                        batchParams.push(pk);

                        Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                            if (btn == "yes") {
                                if (progId == "sal.SaleOrderJF") {
                                    printSaleOrder(batchParams);
                                }
                                else {
                                    call.apply(this);
                                }
                                function call() {
                                    Ext.Ajax.request({
                                        url: '/api/print/printexcel',
                                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                        method: 'POST',
                                        async: false,
                                        timeout: 90000000,
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText);
                                            if (result.Message != null) {
                                                Ext.Msg.alert("提示", result.Message);
                                                getBillListing();
                                            }
                                            else {
                                                var fileName = result;
                                                if (fileName != null && fileName && fileName !== '' && fileName.Result != null) {
                                                    DesktopApp.IgnoreSkip = true;
                                                    try {
                                                        //window.location.href = fileName.Result;
                                                        window.open(fileName.Result);
                                                    } finally {
                                                        DesktopApp.IgnoreSkip = false
                                                    }
                                                }
                                                getBillListing();
                                            }
                                        },
                                        failure: function (response) {
                                            Ext.Msg.alert("提示", "方法调用失败");
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else if (records.length == 0) {
                        Ext.Msg.alert("提示", "未选择数据");
                    }
                    else { Ext.Msg.alert("提示", "只能单选打印"); }
                }
            }]
        });

        //打印
        var printV1 = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            text: '导出excel',
            iconCls: 'fa fa-print',
            hidden: false,
            handler: function () {
                var url = '/api/print/printexcel';
                doPrintV1(progId, url);
            },
            menu: [{
                text: '打印',
                handler: function () {
                    var url = '/api/print/printpdf';
                    doPrintV1(progId, url);
                },
            }]
        });

        var doPrintV1 = function (progId, url) {
            var batchParams = [];
            var records = gridPanel.getView().getSelectionModel().getSelection();
            var pk = [];
            var pkStr = gridPanel.Pks[0];
            if (progId == "pls.WeavPlan") {
                if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return;
                }
                else if (records.length == 1) {
                    var BEAMSIGN = records[0].get("BEAMSIGN");
                    var WEAVNO = records[0].get("WEAVNO");
                    //if (records[0].get("CURRENTSTATE") != 2) {
                    //    Ext.Msg.alert("提示", "该任务书未生效，不能打印！");
                    //    return;
                    //}
                    if (BEAMSIGN ==3) {
                        Ext.Msg.alert("提示", "该任务书对应上轴(经轴2粗纱)，不能打印！");
                        return;
                    }
                    var value = records[0].get(pkStr);
                    pk.push(value);
                    batchParams.push(pk);
                }
                else if (records.length > 1 && records.length <=9) {
                    var BEAMSIGN1 = 0;
                    var BEAMSIGN2 = 0;
                    var BEAMSIGN3 = 0;
                    var BEAMSIGN4 = 0;
                    var BEAMSIGN5 = 0;
                    var BEAMSIGN6 = 0;
                    var BEAMSIGN7 = 0;
                    var BEAMSIGN8 = 0;
                    var BEAMSIGN9 = 0;
                    var BEAMSIGN1 = records[0].get("BEAMSIGN");
                    var BEAMSIGN2 = records[1].get("BEAMSIGN");
                    if (records.length>2) {
                        BEAMSIGN3 = records[2].get("BEAMSIGN");
                    }
                    if (records.length > 3) {
                        BEAMSIGN4 = records[3].get("BEAMSIGN");
                    }
                    if (records.length > 4) {
                        BEAMSIGN5 = records[4].get("BEAMSIGN");
                    }
                    if (records.length > 5) {
                        BEAMSIGN6 = records[5].get("BEAMSIGN");
                    }
                    if (records.length > 6) {
                        BEAMSIGN7 = records[6].get("BEAMSIGN");
                    }
                    if (records.length > 7) {
                        BEAMSIGN8 = records[7].get("BEAMSIGN");
                    }
                    if (records.length > 8) {
                        BEAMSIGN9 = records[8].get("BEAMSIGN");
                    }
               /*     var BEAMSIGN3 = records[2].get("BEAMSIGN");*/
                    //if (records[0].get("CURRENTSTATE") != 2 || records[1].get("CURRENTSTATE") != 2) {
                    //    Ext.Msg.alert("提示", "选中任务书记录存在未生效记录，不能打印！");
                    //    return;
                    //}
                    //if (BEAMSIGN1 == 3 && BEAMSIGN2 == 3 || BEAMSIGN1 == 1 && BEAMSIGN2 == 1 ||
                    //    BEAMSIGN1 == 2 && BEAMSIGN2 == 2 || BEAMSIGN1 == 1 && BEAMSIGN2 == 2 ||
                    //    BEAMSIGN1 == 2 && BEAMSIGN2 == 1) {
                    //    Ext.Msg.alert("提示", "多条打印时，只能选择一条下轴（单轴）和一条上轴数据进行打印！");
                    //    return;
                    //}
                    if (BEAMSIGN1 != 2) {
                        Ext.Msg.alert("提示", "多条打印时，第一条必须选择下轴数据进行打印！");
                        return;
                    }
                    if ((BEAMSIGN1 == 2 && BEAMSIGN2 == 2) || (BEAMSIGN1 == 2 && BEAMSIGN3 == 2) || (BEAMSIGN1 == 2 && BEAMSIGN4 == 2) || (BEAMSIGN1 == 2 && BEAMSIGN5 == 2) || (BEAMSIGN1 == 2 && BEAMSIGN6 == 2) || (BEAMSIGN1 == 2 && BEAMSIGN7 == 2) || (BEAMSIGN1 == 2 && BEAMSIGN8 == 2) || (BEAMSIGN1 == 2 && BEAMSIGN9 == 2)) {
                        Ext.Msg.alert("提示", "多条打印时，只能选择一条下轴（单轴）和多条上轴数据进行打印！");
                        return;
                    }
                    for (var i = 0; i < records.length; i++) {
                        pk.push(records[i].get(pkStr));
                    }
                    batchParams.push(pk);
                    //var value1 = records[0].get(pkStr);
                    //var value2 = records[1].get(pkStr);
                    //pk.push(value1);
                    //pk.push(value2);

                    //if (BEAMSIGN1 == 1 || BEAMSIGN1 == 2) {
                    //    pk.push(value1);
                    //    pk.push(value2);

                    //    batchParams.push(pk);
                    //}
                    //else if (BEAMSIGN2 == 2 || BEAMSIGN2 == 1) {
                    //    pk.push(value2);
                    //    pk.push(value1);

                    //    batchParams.push(pk);
                    //}
                }
                else if (records.length>9) {
                    Ext.Msg.alert("提示", "选择打印记录不能超过九条！");
                    return;
                }
            }
            else if (progId == "pls.WarpPracticable") {
                if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return;
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能单选打印");
                    return;
                }
                var BILLNO = records[0].get("BILLNO");
                //if (records[0].get("CURRENTSTATE") != 2) {
                //    Ext.Msg.alert("提示", BILLNO + "整经计划号暂未生效");
                //    return false;
                //}
                var value = records[0].get(pkStr);
                pk.push(value);
                batchParams.push(pk);
            }
            Ext.Msg.confirm("系统提示", "确定要打印吗?", function (btn) {
                if (btn == "yes") {
                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: url,
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Message != null) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.open(fileName.Result);
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            });
        }

        //var permissionList = checkAllPermission();//必须增加此行，否则网页功能打开会报错。此为方案1，方案2就是吧引用permissionList的行都注释。吴飞飞提供样例为注释引用行
        var queryCondition; //起始定义用，销售订单审核后修改需要该参数

        //有单调拨
        var AddHalfRemark = Ext.create(Ext.Action, {
            text: '添加备注',
            //iconCls: 'fa fa-download',
            //hidden: contains(permissionList, 6666, false, 'Allocation', defineItems),
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条数据");
                        return false;
                    }
                    REMARKS = records[0].get("REMARKS");
                    WEAVNO = records[0].get("WEAVNO");
                    BatchCopyProductCraftFrom2(REMARKS, WEAVNO, function () {
                        getBillListing();
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }

                //if (records.length == 1) {
                //    var msgTemplate = "<table border = '0' cellspacing='0'  cellpadding='0'>";
                //    /*           for (var i = 0; i < records.length; i++) {*/
                //    //var pk = [];
                //    //var pkStr = gridPanel.Pks[0];
                //    //var value = records[i].get("BARCODE");
                //    //for (var k = 0; k < records.length; k++) {
                //    //    if (records[i].get("PRODUCTID") != records[k].get("PRODUCTID")) {
                //    //        Ext.Msg.alert("提示", "存在产品不一致的信息,请重新选择");
                //    //        return false;
                //    //    }
                //    //}


                //    //pk.push(value);
                //    //msgTemplate += "<tr>";
                //    //msgTemplate += "<td> 流水号:" + value + "</td>";
                //    //msgTemplate += "<td width='30px'></td>";
                //    //msgTemplate += "<td> 数量:" + records[i].get("QUANTITY"); + "</td>";
                //    //msgTemplate += "</tr>";
                //    //batchParams.push(pk);
                //    /* }*/
                //    msgTemplate += "<td> 老备注:" + records[0].get("REMARKS")  + "</td>";
                //    msgTemplate += "<td>请输入备注:</td>";
                //    msgTemplate += "<td> 新备注:" + records[0].get("REMARKS") + value + "</td>";
                //    msgTemplate += "</table>";

                //}
                //else if (records.length > 1) {
                //    Ext.Msg.alert("提示", "只能选择一条数据");
                //    return false;
                //}
                //else if (records.length == 0) {
                //    Ext.Msg.alert("提示", "未选择数据");
                //    return false;
                //}
                //Ext.Msg.prompt('添加备注', msgTemplate, function (btn, text) {
                //    if (btn == 'ok') {
                //        //Ext.Msg.prompt('调拨单', '请输入数量:', function (btn, text) {
                //        //    if (btn == 'ok') {
                //        //        // process text value and close...
                //        //    }
                //        //});
                //        Ext.Ajax.request({
                //            url: '/api/halfproductmanagement/AddHalfRemark2',
                //            jsonData: { handle: records[0].get("WEAVNO"), progId: records[0].get("REMARKS")+","+text, batchParams: batchParams, personId: personId },
                //            method: 'POST',
                //            async: false,
                //            timeout: 90000000,
                //            success: function (response) {
                //                var result = Ext.decode(response.responseText);
                //                if (result.Message != null) {
                //                    Ext.Msg.alert("提示", result.Message);
                //                    getBillListing();
                //                }
                //            },
                //            failure: function (response) {
                //                Ext.Msg.alert("提示", "方法调用失败");
                //            }
                //        });
                //    }
                //});
            }
        });

        function BatchCopyProductCraftFrom2(REMARKS, WEAVNO, Commonfunc) {

            var form = new Ext.FormPanel({
                //labelAlign: 'top',
                bodyStyle: 'padding:5px 5px 0',
                layout: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '任务书号',
                        name: 'WEAVNO',
                        readOnly: true,
                        value: WEAVNO
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '老备注',
                        name: 'REMARKS',
                        readOnly: true,
                        value: REMARKS
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '新备注',
                        name: 'XREMARKS',
                        value: REMARKS
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    {
                        text: '保存',
                        handler: function () {
                            var batchParams = [];
                            var WEAVNO = form.getForm().findField('WEAVNO').getValue();
                            var XREMARKS = form.getForm().findField('XREMARKS').getValue();
                            var PERSONID = Ext.util.Cookies.get("loginPersonId");
                            Ext.Ajax.request({
                                url: '/api/halfproductmanagement/AddHalfRemark2',
                                jsonData: {
                                    handle: WEAVNO, progId: XREMARKS, batchParams: batchParams, personId: PERSONID
                                },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    result = Ext.decode(response.responseText);
                                    if (result.Success) {
                                        Commonfunc();
                                        Ext.Msg.alert("提示", "操作成功！");
                                        win.close(this);
                                    }
                                    else {
                                        Ext.Msg.alert("提示", result.Message);
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            })
                        }
                    }, {
                        text: '关闭',
                        handler: function () {
                            win.close(this);
                        }
                    }
                ]
            });
            var win = Ext.create("Ext.window.Window", {
                title: "修改备注",       //标题
                draggable: false,
                height: 260,                          //高度
                width: 400,                           //宽度
                layout: "fit",                        //窗口布局类型
                modal: true, //是否模态窗口，默认为false
                resizable: false,
                items: [form]
            });
            win.show();
        }

        //20210517 addbutton start
        //制单
        var createOrder = Ext.create(Ext.Action, {
            text: '制单',
            //iconCls: 'fa fa-file-excel-o',
            /*            hidden: contains(permissionList, 6666, false, 'createOrder', defineItems),*/
            handler: function () {
                //Ext.Msg.confirm("系统提示", "请确认供应商是否准确，不准确请修改", function (btn) {
                //    if (btn == "yes") {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/supplierplatform/createorder',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
                //    }
                //});
            }
        });
        //计算原料
        var calcMaterial = Ext.create(Ext.Action, {
            text: '计算原料',
            //iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6666, false, 'calcMaterial', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/supplierplatform/calculatematerial',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //反审核
        var deAudit = Ext.create(Ext.Action, {
            text: '反审核',
            iconCls: 'fa fa-reply',
            /*              hidden: contains(permissionList, 6666, false, 'deAudit', defineItems),*/
            handler:
                function () {
                    var batchParams = [];
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    var personId = Ext.util.Cookies.get("loginPersonId");
                    if (records.length > 0) {
                        var batchMethod = [];
                        var count = gridPanel.Pks.length;
                        for (var i = 0; i < records.length; i++) {
                            var pkStr = gridPanel.Pks[0];
                            var value = records[i].get(pkStr);

                            batchParams.push(value);
                        }
                        call.apply(this);
                    }
                    else {
                        Ext.Msg.alert("提示", "未选择数据");
                    }
                    function call() {
                        Ext.Ajax.request({
                            url: '/api/common/deaudit',
                            jsonData: { fieldName: gridPanel.Pks[0], progId: progId, objIds: batchParams, personId: personId },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
        });
        //提取供应商
        var getSupplier = Ext.create(Ext.Action, {
            text: '提取供应商',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'getSupplier', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/supplierplatform/getsupplier',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //计算领料
        var pickMaterial = Ext.create(Ext.Action, {
            text: '计算领料',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'pickMaterial', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/materialmanagement/pickmaterial',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //打印经轴卡
        var printWarp = Ext.create(Ext.Action, {
            text: '打印经轴卡',
            //iconCls: 'fa fa-download',
            //hidden: contains(permissionList, 6666, false, 'printWarp', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                Ext.Ajax.request({
                                    url: '/api/ProduceManagement/QJExport',
                                    jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.Message != null) {
                                            Ext.Msg.alert("提示", result.Message);
                                            getBillListing();
                                        }
                                        else {
                                            var fileName = result;
                                            if (fileName && fileName !== '') {
                                                DesktopApp.IgnoreSkip = true;
                                                try {
                                                    window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                    getBillListing();
                                                } finally {
                                                    DesktopApp.IgnoreSkip = false
                                                }
                                            }
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                        }
                    });
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });
        //织造下单【20210625舍弃】
        var weavOrder = Ext.create(Ext.Action, {
            text: '织造下单',
            //iconCls: 'fa fa-download',
            //hidden: contains(permissionList, 8192, false, 'importData', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/production/weavorder',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //织造落实【20210625舍弃】
        var weavPracticable = Ext.create(Ext.Action, {
            text: '织造落实',
            //iconCls: 'fa fa-download',
            //hidden: contains(permissionList, 8192, false, 'importData', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/production/weavpracticable',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //制定打样任务
        var doProofingTask = Ext.create(Ext.Action, {
            text: '制定打样任务',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'doProofingTask', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/design/doproofingtask',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personid: personid },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //确定项目负责人
        var doTaskPerson = Ext.create(Ext.Action, {
            text: '确定项目负责人',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'doTaskPerson', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/design/dotaskperson',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personid: personid },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //确定纱线情况
        var doYarnState = Ext.create(Ext.Action, {
            text: '确定纱线情况',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'doYarnState', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/design/doyarnstate',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personid: personid },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //仓管员确认
        var doWarehouse = Ext.create(Ext.Action, {
            text: '仓管员确认',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'doWarehouse', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/design/dowarehouse',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personid: personid },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //完成
        var doComplete = Ext.create(Ext.Action, {
            text: '完成',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'doComplete', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/design/docomplete',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personid: personid },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //打印品质单
        var printPz = Ext.create(Ext.Action, {
            text: '打印品质单',
            iconCls: 'fa fa-print',
            /*            hidden: contains(permissionList, 6666, false, 'printPz', defineItems),*/
            handler: function () {
                Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                    if (btn == "yes") {
                        var batchParams = [];
                        var records = gridPanel.getView().getSelectionModel().getSelection();
                        if (records.length == 1) {
                            var pk = [];
                            var pkStr = gridPanel.Pks[0];
                            var value = records[0].get(pkStr);
                            pk.push(value);

                            batchParams.push(pk);

                            call.apply(this);
                        }
                        else if (records.length == 0) {
                            Ext.Msg.alert("提示", "未选择数据");
                        }
                        else { Ext.Msg.alert("提示", "只能单选打印"); }
                        function call() {
                            Ext.Ajax.request({
                                url: '/api/design/PZExport',
                                jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Message != null) {
                                        Ext.Msg.alert("提示", result.Message);
                                        getBillListing();
                                    }
                                    else {
                                        var fileName = result;
                                        if (fileName && fileName !== '') {
                                            DesktopApp.IgnoreSkip = true;
                                            try {
                                                window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                //window.location.href = '/TempData/ExportData/' + fileName;
                                            } finally {
                                                DesktopApp.IgnoreSkip = false
                                            }
                                        }
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    }
                });
            }
        });
        //打印产品工艺单
        var printPro = Ext.create(Ext.Action, {
            text: '打印工艺单',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6666, false, 'printPz', defineItems),
            handler: function () {
                Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                    if (btn == "yes") {
                        var batchParams = [];
                        var records = gridPanel.getView().getSelectionModel().getSelection();
                        if (records.length == 1) {
                            var pk = [];
                            var pkStr = gridPanel.Pks[0];
                            var value = records[0].get(pkStr);
                            pk.push(value);

                            batchParams.push(pk);

                            call.apply(this);
                        }
                        else if (records.length == 0) {
                            Ext.Msg.alert("提示", "未选择数据");
                        }
                        else { Ext.Msg.alert("提示", "只能单选打印"); }
                        function call() {
                            Ext.Ajax.request({
                                url: '/api/design/ProExport',
                                jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Message != null) {
                                        Ext.Msg.alert("提示", result.Message);
                                        getBillListing();
                                    }
                                    else {
                                        var fileName = result;
                                        if (fileName && fileName !== '') {
                                            DesktopApp.IgnoreSkip = true;
                                            try {
                                                window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                //window.location.href = '/TempData/ExportData/' + fileName;
                                            } finally {
                                                DesktopApp.IgnoreSkip = false
                                            }
                                        }
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    }
                });
            }
        });
        //打印流水号
        var printSerialno = Ext.create(Ext.Action, {
            text: '打印流水号',
            iconCls: 'fa fa-print',
            /*        hidden: contains(permissionList, 6666, false, 'printSerialno', defineItems),*/
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var msg = "确定要打印吗？";
                if (progId == "pls.WeavPlan" || progId == "pls.Outsourcing") {
                    if (records.length == 1) {

                    }
                    else if (records.length == 0) {
                        Ext.Msg.alert("提示", "未选择数据");
                        return false;
                    }
                    else {
                        Ext.Msg.alert("提示", "只能单选打印");
                        return false;
                    }
                    var BEAMSIGN = records[0].get("BEAMSIGN");
                    if (BEAMSIGN == 2) {
                        msg = "该任务书对应下轴（经轴1细纱），确定是否要打印流水号？";
                    }
                }
                for (var i = 0; i < records.length; i++) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[i].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);
                }

                Ext.Msg.confirm("系统提示", msg, function (btn) {
                    if (btn == "yes") {
                        call.apply(this);
                        function call() {
                            Ext.Ajax.request({
                                url: '/api/production/printserialno',
                                jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Message != null) {
                                        Ext.Msg.alert("提示", result.Message);
                                        getBillListing();
                                    }
                                    else {
                                        var fileName = result;

                                        var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                        var printhtml = "";

                                        //LODOP.PRINT_INITA(0, 0, "100%", "100%", "打印控件功能演示_Ext");
                                        if (progId == "pls.WeavPlan" || progId == "pls.Outsourcing") {
                                            var index = 0;
                                            for (var i = 0; i < result.length; i++) {
                                                //result[i].AFTERWAYROUTENAME = '扎毛稳泡涂层/120g黑色无纺棉复合';//染色/易去污/105克网棉复合/反面印花
                                                //result[i].AFTERWAYROUTENAME = '防水/3 pass coating/NFPA 701/Flocking';//染色/易去污/105克网棉复合/反面印花
                                                for (var count = 0; count < 2; count++) {
                                                    var row2AfterFlag = false;
                                                    var signName = result[i].WEAVDEVICEID == "" ? "" : result[i].WEAVDEVICEID;
                                                    signName = signName == "" ? result[i].SUPPLIERNAME : signName + "/" + result[i].SUPPLIERNAME;

                                                    printhtml += "<table border=0 cellpadding = 0 cellspacing = 0 >";
                                                    var printhtml_temp = "";
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "产品型号：" + result[i].PRODUCTID);
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "订单号：" + result[i].ORDERID);
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "订单数量：" + result[i].ORDERNum);
                                                    if (progId == "pls.Outsourcing") {
                                                        printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "外购户：" + result[i].SupplierId);
                                                    }
                                                    else {
                                                        printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "机台：" + signName);
                                                    }
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "卷号：" + result[i].ROLLNUM + " - " + result[i].ROWNO);
                                                    if (progId == "pls.Outsourcing") {
                                                        printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "外购单号：" + result[i].PlsOutsourcingNo);
                                                    }
                                                    else {
                                                        printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "任务书：" + result[i].WEAVNO);
                                                    }

                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "订单门幅：" + result[i].GATEWIDTH + " cm");
                                                    var AFTERWAYROUTENAME = result[i].AFTERWAYROUTENAME;
                                                    var AFTERWAYROUTENAME_1 = "";
                                                    var AFTERWAYROUTENAME_2 = "";
                                                    var AFTERWAYROUTENAMELength = 9;
                                                    if (AFTERWAYROUTENAME.length > AFTERWAYROUTENAMELength) {
                                                        row2AfterFlag = true;
                                                        AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME.substring(0, AFTERWAYROUTENAMELength);
                                                        AFTERWAYROUTENAME_2 = AFTERWAYROUTENAME.substring(AFTERWAYROUTENAMELength);
                                                    }
                                                    else {
                                                        AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME;
                                                    }
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "后整理：" + AFTERWAYROUTENAME_1);
                                                    if (AFTERWAYROUTENAME_2.length > 0) {
                                                        printhtml_temp += SetPrintTR('6mm', 'left', '', '14px', "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + AFTERWAYROUTENAME_2);
                                                    }
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "缸号：" + result[i].SUBBATCHNO);
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "检验米数：");
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "检验员：");
                                                    printhtml_temp += SetPrintTR('8mm', 'left', 'padding-left:10px; padding-top:10px;', '30px', result[i].SERIALNO);
                                                    //printhtml_temp += SetPrintTR('12mm', 'left', 'padding-left:10pt;', '15px', "<img src='" + result[i].BARCODE + "'>");
                                                    printhtml_temp += SetPrintTR('12mm', 'left', 'padding-left:10pt;', '15px', "");
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "&nbsp;&nbsp;甲：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙：");
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "");
                                                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "------------------------------------");

                                                    if (row2AfterFlag) {
                                                        printhtml += SetPrintTR('5mm', 'left', '', '15px', "");
                                                        printhtml += printhtml_temp;
                                                        printhtml += SetPrintTR('3mm', 'left', '', '15px', "");
                                                    }
                                                    else {
                                                        printhtml += SetPrintTR('8mm', 'left', '', '15px', "");
                                                        printhtml += printhtml_temp;
                                                        printhtml += SetPrintTR('6mm', 'left', '', '15px', "");
                                                    }

                                                    //printhtml += printhtml_temp;
                                                    //printhtml += SetPrintTR('9mm', 'left', '', '15px', "");
                                                    //printhtml += SetPrintTR('15mm', 'left', '', '15px', "");
                                                    printhtml += "</table >";
                                                    index++;
                                                }
                                            }
                                        }
                                        else if (progId == "stk.HalfAccountDetail") {
                                            for (var i = 0; i < result.length; i++) {
                                                for (var count = 0; count < 2; count++) {
                                                    printhtml +=
                                                        "<tr height = 26 style = 'mso-height-source:userset;height:20.1pt;line-height: 24pt;' >"
                                                        + "    <td  colspan=2 ></td >"
                                                        + "</tr>"
                                                        + "<tr height=18 style = 'height:15pt; line-height: 24pt;' >"
                                                        + "        <td style='font-size:12px;'>产品型号：</td>"
                                                        + "    <td  style = 'text-align:left;font-size:14px;margin-left:-20px;' > " + result[i].PRODUCTID + "</td >"
                                                        + "</tr>"
                                                        + "<tr height=18 style = height:15pt; line-height: 24pt;font-size:12px' >"
                                                        + "        <td style='font-size:12px;'>订单号：</td>"
                                                        + "        <td style = 'text-align:left;font-size:14px;margin-left:-20px;' >" + result[i].ORDERID + "</td >"
                                                        + "</tr >"
                                                        + "<tr height=18 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "        <td >机台卷号：</td>"
                                                        + "        <td  style = 'text-align:left;font-size:14px;margin-left:-20px;' > " + result[i].WEAVDEVICEID + " &nbsp;&nbsp;&nbsp; " + result[i].ROLLNUMNO + "</td >"
                                                        + " </tr >"
                                                        + "<tr height=18 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "        <td style='font-size:12px;'>任务书号：</td>"
                                                        + "    <td style = 'text-align:left;font-size:14px;margin-left:-20px;' > " + result[i].WEAVNO + "</td >"
                                                        + "</tr >"
                                                        + "<tr height=18 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "        <td style='font-size:12px;'>订单门幅：</td>"
                                                        + "     <td style = 'text-align:left;font-size:14px;margin-left:-20px;' > " + result[i].GATEWIDTH + " cm</td >"
                                                        + "</tr >"
                                                        + "<tr height=36 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "        <td  style='font-size:12px;'>后处理：</td>"
                                                        + "        <td style = 'text-align:left;font-size:14px;margin-left:-20px;' > " + result[i].AFTERWAYROUTENAME + "</td >"
                                                        + "</tr >"
                                                        //+ "<tr height=36 style = 'mso-height-source:userset;height:26pt;line-height: 24pt;' >"
                                                        //+ "        <td  colspan=2 style='letter-spacing: 5px;'><font size='2'>[" + result[i].AFTERWAYREMARK + "]</font></td>"
                                                        //+ "</tr >"
                                                        + "<tr height=18 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "        <td  style='font-size:12px'>缸&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;：</td>"
                                                        + "    <td  style='text-align:left;font-size:14px;'>&nbsp;&nbsp;" + result[i].SUBBATCHNO + "</td>"
                                                        + "</tr >"
                                                        + "<tr height=18 style = height:15pt;line-height: 24pt;' >"
                                                        + "        <td  style='font-size:12px'>检验米数：</td>"
                                                        + "        <td  style='border-top:none;font-size:14px;margin-left:-20px;'>　</td>"
                                                        + "</tr >"
                                                        + "<tr height=18 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "        <td style='font-size:12px'>检验员：</td>"
                                                        + "        <td  style='border-top:none;font-size:14px;margin-left:-20px;'>　</td>"
                                                        + "</tr >"
                                                        + "<tr height=18 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "        <td colspan=2  style = 'text-align:left;height:20.1pt;font-size:32px' >&nbsp;&nbsp; " + result[i].SERIALNO + "</td >"
                                                        + "</tr >"
                                                        + "<tr style='height:35pt'>"
                                                        + "        <td colspan=2  style='text-align:left;height:35pt;line-height: 24pt;'>"
                                                        + "        <img src='" + result[i].BARCODE + "' >"
                                                        + "    </td>"
                                                        + "</tr >"
                                                        + "<tr height=18 style = 'height:15pt;line-height: 24pt;' >"
                                                        + "     <td colspan=2  style = 'text-align:left;height:20.1pt' >"
                                                        + "        &nbsp;&nbsp; 甲：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 乙：</td >"
                                                        + "</tr >"
                                                        + "<tr style='height:20.1pt;line-height: 24pt;'>"
                                                        + "        <td colspan=2 >　</td>"
                                                        + "</tr >"
                                                }
                                            }
                                        }
                                        //printhtml += "</table >";
                                        LODOP.ADD_PRINT_HTM(0, 35, "100%", "100%", printhtml);
                                        //LODOP.SET_PRINT_STYLE("FontSize", 10);
                                        //LODOP.SET_PRINT_STYLEA(1, "FontSize", 9);
                                        //LODOP.SET_PRINT_STYLEA(2, "FontSize", 9);
                                        //LODOP.ADD_PRINT_BARCODE(3, 10, 105, 105, "QRCode", 1);
                                        //LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 4);
                                        var index2 = 0;
                                        for (var i = 0; i < result.length; i++) {
                                            for (var count = 0; count < 2; count++) {
                                                var row2AfterFlag = false;
                                                var AFTERWAYROUTENAME_1 = "";
                                                var AFTERWAYROUTENAME_2 = "";
                                                var AFTERWAYROUTENAMELength = 9;
                                                if (AFTERWAYROUTENAME.length > AFTERWAYROUTENAMELength) {
                                                    row2AfterFlag = true;
                                                    AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME.substring(0, AFTERWAYROUTENAMELength);
                                                    AFTERWAYROUTENAME_2 = AFTERWAYROUTENAME.substring(AFTERWAYROUTENAMELength);
                                                }
                                                else {
                                                    AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME;
                                                }
                                                if (row2AfterFlag) {
                                                    printhtml += SetPrintTR('5mm', 'left', '', '15px', "");
                                                    printhtml += printhtml_temp;
                                                    printhtml += SetPrintTR('3mm', 'left', '', '15px', "");
                                                    LODOP.ADD_PRINT_BARCODE(90 + (index2 * 123.83) + 'mm', '9mm', '120px', '35px', '128Auto', result[i].SERIALNO);
                                                    LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
                                                }
                                                else {
                                                    printhtml += SetPrintTR('8mm', 'left', '', '15px', "");
                                                    printhtml += printhtml_temp;
                                                    printhtml += SetPrintTR('6mm', 'left', '', '15px', "");
                                                    LODOP.ADD_PRINT_BARCODE(87 + (index2 * 123.83) + 'mm', '9mm', '120px', '35px', '128Auto', result[i].SERIALNO);
                                                    LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
                                                }
                                                index2++;
                                            }
                                        }
                                        LODOP.SET_PRINT_PAGESIZE(1, 650, 1238);
                                        LODOP.SET_PRINT_STYLEA(0, "TableRowThickNess", 25);
                                        //if (row2AfterFlag) {
                                        //    LODOP.SET_PRINT_PAGESIZE(1, 650, 2476); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小
                                        //} else {
                                        //    LODOP.SET_PRINT_PAGESIZE(1, 650, 2476);
                                        //}

                                        //LODOP.ADD_PRINT_TEXT(226, 2, 276, 112, "@StorageID");
                                        LODOP.PREVIEW();
                                        //window.document.body.innerHTML = printhtml;
                                        //window.print();   
                                        //LODOP.PRINT();
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    }
                });

            }
        });

        
        //导出员工花名册
        var ExportRoster = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-upload',
            text: '导出员工花名册',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchParams = [];
                    for (var i = 0; i < records.length; i++) {
                        batchParams.push(records[i].data.PERSONID);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }

                function call() {
                    var data = { PersonIds: batchParams };
                    Ext.Ajax.request({
                        url: 'api/PersonData/ExportRoster',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/ImportData/ExportRoster/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }

            }
        });

        //打印小标签（任务书）
        var printWeavPlanLabel = Ext.create(Ext.Action, {
            text: '打印小标签',
            iconCls: 'fa fa-print',
            /*        hidden: contains(permissionList, 6666, false, 'printSerialno', defineItems),*/
            handler: function () {
                doPrintWeavPlanLabel(0);
            },
            menu: [{
                text: '导出Excel',
                handler: function () {
                    doPrintWeavPlanLabel(1);
                }
            }]
        });
        var doPrintWeavPlanLabel = function (printWay) {
            var batchParams = [];
            var records = gridPanel.getView().getSelectionModel().getSelection();
            var msg = "确定要打印吗？";
            if (records.length == 1) {

            }
            else if (records.length == 0) {
                Ext.Msg.alert("提示", "未选择数据");
                return false;
            }
            else {
                Ext.Msg.alert("提示", "只能单选打印");
                return false;
            }
            for (var i = 0; i < records.length; i++) {
                var pk = [];
                var pkStr = gridPanel.Pks[0];
                var value = records[i].get(pkStr);
                pk.push(value);

                batchParams.push(pk);
            }

            Ext.Msg.confirm("系统提示", msg, function (btn) {
                if (btn == "yes") {
                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: '/api/production/PrintWeavPlanLabel',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, printWay: printWay },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Message != null) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.open(fileName.Result);
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            });
        }
        //跳转
        var jumpPage = Ext.create(Ext.Action, {
            text: '跳转',
            //iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6666, false, 'jumpPage', defineItems),
            handler: function () {
                window.open("http://198.198.198.250:9997/#/home?UserHandle=" + UserHandle + "&progId=" + progId);
                //window.open("http://localhost:3334/#/home?UserHandle=" + UserHandle + "&progId=" + progId);
                //window.open("http://192.168.1.24:3334/#/home?UserHandle=" + UserHandle + "&progId=" + progId);
                return;
            }
        });
        //任务书查领料
        var lookMaterial = Ext.create(Ext.Action, {
            text: '查领料',
            //iconCls: 'fa fa-download',
            /*          hidden: contains(permissionList, 6666, false, 'lookMaterial', defineItems),*/
            handler: function () {
                var batchParams = [];
                //var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        //var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get("WEAVNO");
                            if (value == "") {
                                Ext.Msg.alert("提示", "该织造计划暂未织造下单");
                                return false;
                            }
                            else {
                                batchParams.push({
                                    Name: "WEAVNO",
                                    QueryChar: 1,
                                    Value: [value]
                                });
                            }
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                if (batchParams.length > 1) {
                    Ext.Msg.alert("提示", "请选择一条数据");
                    return false;
                }
                queryCondition = { QueryFields: batchParams };
                //var entryParam2 = '{"QueryFields": {"condition": {"Name": "WEAVNO","QueryChar": "1","Value": [20210716002]}}}';
                //var entryParam2 = { "QueryFields": { condition: batchParams } };
                //var entryParam2 = '{"ParamStore":{"WEAVNO":' + batchParams + '}}';
                Ax.utils.LibVclSystemUtils.openRpt("pls.WeavPickMaterialRpt", "查领料", BillActionEnum.Browse, queryCondition, undefined, undefined);

            }
        });
        //打印采购单
        var printPurOrder = Ext.create(Ext.Action, {
            text: '打印采购单',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'printPurOrder', defineItems),*/
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                Ext.Ajax.request({
                                    url: '/api/SupplierPlatform/PrintPurOrder',
                                    jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.Message != null) {
                                            Ext.Msg.alert("提示", result.Message);
                                            getBillListing();
                                        }
                                        else {
                                            var fileName = result;
                                            if (fileName && fileName !== '') {
                                                DesktopApp.IgnoreSkip = true;
                                                try {
                                                    window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                } finally {
                                                    DesktopApp.IgnoreSkip = false
                                                }
                                            }
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                        }
                    });
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });
        //打印染色单
        var printDyeOrder = Ext.create(Ext.Action, {
            text: '打印染色单',
            //iconCls: 'fa fa-download',
            /*         hidden: contains(permissionList, 6666, false, 'printDyeOrder', defineItems),*/
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                Ext.Ajax.request({
                                    url: '/api/SupplierPlatform/PrintDyeOrder',
                                    jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.Message != null) {
                                            Ext.Msg.alert("提示", result.Message);
                                            getBillListing();
                                        }
                                        else {
                                            var fileName = result;
                                            if (fileName && fileName !== '') {
                                                DesktopApp.IgnoreSkip = true;
                                                try {
                                                    window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                } finally {
                                                    DesktopApp.IgnoreSkip = false
                                                }
                                            }
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                        }
                    });
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });
        //打印加捻并线单
        var printTwistOrder = Ext.create(Ext.Action, {
            text: '打印加捻并线单',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'printTwistOrder', defineItems),*/
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                Ext.Ajax.request({
                                    url: '/api/SupplierPlatform/PrintTwistOrder',
                                    jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.Message != null) {
                                            Ext.Msg.alert("提示", result.Message);
                                            getBillListing();
                                        }
                                        else {
                                            var fileName = result;
                                            if (fileName && fileName !== '') {
                                                DesktopApp.IgnoreSkip = true;
                                                try {
                                                    window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                } finally {
                                                    DesktopApp.IgnoreSkip = false
                                                }
                                            }
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                        }
                    });
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });
        //打印任务书
        var printZZOrder = Ext.create(Ext.Action, {
            text: '打印任务书',
            //iconCls: 'fa fa-download',
            /*           hidden: contains(permissionList, 6666, false, 'printZZOrder', defineItems),*/
            handler: function () {
                showLogisticsCompanyWin();
                //var batchParams = [];
                //var records = gridPanel.getView().getSelectionModel().getSelection();
                //if (records.length == 1 || records.length == 2) {
                //    var count = gridPanel.Pks.length;
                //    var weavno = "";
                //    var can = true;
                //    for (var i = 0; i < records.length; i++) {
                //        var pk = [];
                //        for (var r = 0; r < count; r++) {
                //            var pkStr = gridPanel.Pks[r];
                //            var value = records[i].get(pkStr);
                //            if (records[i].get("CURRENTSTATE") != 2) {
                //                weavno += records[i].get("WEAVNO") + ",";
                //                can = false;
                //            }
                //            pk.push(value);
                //        }
                //        batchParams.push(pk);
                //    }
                //    if (can) {
                //        Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                //            if (btn == "yes") {
                //                call.apply(this);
                //                function call() {
                //                    Ext.Ajax.request({
                //                        url: '/api/ProduceManagement/ZZExport',
                //                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                //                        method: 'POST',
                //                        async: false,
                //                        timeout: 90000000,
                //                        success: function (response) {
                //                            var result = Ext.decode(response.responseText);
                //                            if (result.Message != null) {
                //                                Ext.Msg.alert("提示", result.Message);
                //                                //getBillListing();
                //                            }
                //                            else {
                //                                var fileName = result;
                //                                if (fileName && fileName !== '') {
                //                                    DesktopApp.IgnoreSkip = true;
                //                                    try {
                //                                        window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                //                                        getBillListing();
                //                                    } finally {
                //                                        DesktopApp.IgnoreSkip = false
                //                                    }
                //                                }
                //                            }
                //                        },
                //                        failure: function (response) {
                //                            Ext.Msg.alert("提示", "方法调用失败");
                //                        }
                //                    });
                //                }
                //            }
                //        });
                //    }
                //    else {
                //        Ext.Msg.alert("提示", weavno.substring(0, weavno.length - 1) + "任务书号暂未生效");
                //        return false;
                //    }
                //}
                //else if (records.length == 0) {
                //    Ext.Msg.alert("提示", "未选择数据");
                //}
                //else { Ext.Msg.alert("提示", "只能选择1个或者2个任务书打印"); }
            }
        });
        //打印购货合同
        var printContract = Ext.create(Ext.Action, {
            text: '打印购货合同',
            iconCls: 'fa fa-print',
            /*       hidden: contains(permissionList, 6666, false, 'printContract', defineItems),*/
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        for (var k = 0; k < records.length; k++) {
                            if (records[i].get("SUPPLIERID") != records[k].get("SUPPLIERID")) {
                                Ext.Msg.alert("消息提示", "请选择相同外购户的单据");
                                return false;
                            }
                            if (records[i].get("PRODUCTID") != records[k].get("PRODUCTID")) {
                                Ext.Msg.alert("消息提示", "请选择相同产品型号的单据");
                                return false;
                            }
                        }
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);
                        pk.push(value);

                        batchParams.push(pk);

                    }
                }
                else if (records.length > 4) {
                    Ext.Msg.alert("提示", "最多只能选择四条数据打印");
                    return false;
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                    if (btn == "yes") {
                        call.apply(this);
                        function call() {
                            Ext.Ajax.request({
                                url: '/api/planmanagement/PrintContract',
                                jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Message != null) {
                                        Ext.Msg.alert("提示", result.Message);
                                        getBillListing();
                                    }
                                    else {
                                        var fileName = result;
                                        if (fileName && fileName !== '') {
                                            DesktopApp.IgnoreSkip = true;
                                            try {
                                                window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                            } finally {
                                                DesktopApp.IgnoreSkip = false
                                            }
                                        }
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    }
                });
            }
        });
        //打印出入库单
        var printBillStock = Ext.create(Ext.Action, {
            text: '打印',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6666, false, 'printContract', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var value = null;
                if (records.length == 1) {
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        value = records[i].get(pkStr);
                        pk.push(value);

                        batchParams.push(pk);

                    }
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "最多只能选择一条数据打印");
                    return false;
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                if (progId == "stk.PurMaterialStockIn" || progId == "stk.PurMaterialStockReturn"
                    || progId == "stk.OutsourcingStockIn" || progId == "stk.OutsourcingStockOut"
                    || progId == "stk.OutsourcingStockReturn" || progId == "stk.WarpStockOut"
                    || progId == "stk.WeavStockOut" || progId == "stk.WarpStockReturn"
                    || progId == "stk.WeavStockReturn" || progId == "stk.MoveStock"
                    || progId == "stk.ProofingStockOut" || progId == "stk.ProofingStockReturn"
                    || progId == "stk.TakeawayStockOut" || progId == "stk.OutsourcingStockLoss"
                    || progId == "stk.MaterialLoss"

                ) {
                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                Ext.Ajax.request({
                                    url: '/api/materialmanagement/PrintExcelBill',
                                    jsonData: { handle: value, progId: progId, batchParams: batchParams },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.Message != null) {
                                            Ext.Msg.alert("提示", result.Message);
                                            getBillListing();
                                        }
                                        else {
                                            //var fileName = result;
                                            //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            ////LODOP.PRINT_INITA(0, 0, "100%", "100%", "打印控件功能演示_Ext");
                                            //var content = "";
                                            //var printhtml = "";
                                            var fileName = result;
                                            if (fileName && fileName !== '') {
                                                DesktopApp.IgnoreSkip = true;
                                                try {
                                                    window.open('/TempData/ExportData/' + GetCurrentDate() + '/' + fileName);
                                                    //window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                    getBillListing();
                                                } finally {
                                                    DesktopApp.IgnoreSkip = false
                                                }
                                            }
                                            //采购入库单
                                            //if (progId == "stk.PurMaterialStockIn") {
                                            //content = result[0].content;
                                            ////var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //    .replace("#BILLDATE#", result[0].BILLDATE.replace("-", "年").replace("-", "月") + "日")
                                            //    .replace("#SUPPLIERNAME#", result[0].SUPPLIERNAME);

                                            //var dataList = result[0].DetailList;
                                            //var number = 0;
                                            //for (var k = 0; k < dataList.length; k++) {
                                            //    printhtml += `<tr> 
                                            //                 <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                 <td align='center'>${dataList[k].MATERIALTYPEID}</td>
                                            //                 <td align='center'>${result[0].SUPPLIERID + "/" + (dataList[k].SUBBATCHNO == "" ? "" : dataList[k].SUBBATCHNO + "/") + result[0].BILLDATE.substring(5, 10).replace("-", ".")}</td>
                                            //                 <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                 <td align='center'>${dataList[k].REMARK}</td>
                                            //               </tr > `;
                                            //    number += dataList[k].QUANTITY;
                                            //}
                                            //if (dataList.length < 8) {
                                            //    for (var index = 0; index < 8 - dataList.length; index++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>&nbsp;</td>  
                                            //                     <td align='center'>&nbsp;</td>
                                            //                     <td align='center'>&nbsp;</td>
                                            //                     <td align='center'>&nbsp;</td>
                                            //                     <td align='center'>&nbsp;</td>
                                            //                   </tr > `;
                                            //    }
                                            //}

                                            //printhtml += `      <tr> 
                                            //                    <td align='center' colspan='3'>合   计：</td>
                                            //                    <td>${number}</td>
                                            //                    <td></td> 
                                            //                </tr>`;

                                            //}
                                            //委外入库单
                                            //else if (progId == "stk.OutsourcingStockIn") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#TYPE#", result[0].TYPE)
                                            //        .replace("#BILLDATE#", result[0].BILLDATE.replace("-", "年").replace("-", "月") + "日")
                                            //        .replace("#SUPPLIERNAME#", result[0].SUPPLIERNAME);

                                            //    var dataList = result[0].DetailList;
                                            //    var number = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].PLANNO}</td>  
                                            //                     <td align='center'>${dataList[k].SUBBATCHNO}</td>
                                            //                     <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].STORAGEID}</td>
                                            //                     <td align='center'>${dataList[k].REMARK}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr > `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td align='center' >合   计：</td>
                                            //                        <td></td>
                                            //                        <td></td>
                                            //                        <td>${number}</td>
                                            //                        <td></td> 
                                            //                        <td></td> 
                                            //                    </tr>`;
                                            //}
                                            ////委外出库单
                                            //else if (progId == "stk.OutsourcingStockOut") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#SUPPLIERNAME#", result[0].SUPPLIERNAME);

                                            //    var dataList = result[0].DetailList;
                                            //    var number = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                     <td align='center'>${dataList[k].MATERIALTYPEID}</td>
                                            //                     <td align='center'>${dataList[k].SUBBATCHNO}</td>
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].STORAGEID}</td>
                                            //                     <td align='center'>${dataList[k].REMARK}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr> `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td align='center' colspan='3'>合   计：</td>
                                            //                        <td>${number}</td>
                                            //                        <td></td> 
                                            //                        <td></td> 
                                            //                    </tr>`;
                                            //}
                                            ////委外退料
                                            //else if (progId == "stk.OutsourcingStockReturn") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#WAY#", result[0].WAY)
                                            //        .replace("#TYPE#", result[0].TYPE)
                                            //        .replace("#BILLDATE#", result[0].BILLDATE.replace("-", "年").replace("-", "月") + "日")
                                            //        .replace("#SUPPLIERNAME#", result[0].SUPPLIERNAME);

                                            //    var dataList = result[0].DetailList;
                                            //    var number = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].PLANNO}</td>  
                                            //                     <td align='center'>${dataList[k].SUBBATCHNO}</td>
                                            //                     <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].STORAGEID}</td>
                                            //                     <td align='center'>${dataList[k].REMARK}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr > `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td align='center' >合   计：</td>
                                            //                        <td></td>
                                            //                        <td></td>
                                            //                        <td>${number}</td>
                                            //                        <td></td> 
                                            //                        <td></td> 
                                            //                    </tr>`;
                                            //}
                                            ////整经领料出库
                                            //else if (progId == "stk.WarpStockOut") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#BILLDATE#", result[0].BILLDATE)
                                            //        .replace("#SUPPLIERID#", result[0].SUPPLIERID);

                                            //    var dataList = result[0].DetailList;
                                            //    var number = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].WARPNO}</td>  
                                            //                     <td align='center'>${dataList[k].SUBBATCHNO}</td>
                                            //                     <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].STORAGEID}</td>
                                            //                     <td align='center'>${dataList[k].REMARK}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr> `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td align='center'>合   计：</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>${number}</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                    </tr>`;
                                            //}
                                            ////织造领料出库
                                            //else if (progId == "stk.WeavStockOut") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#BILLDATE#", result[0].BILLDATE)
                                            //        .replace("#SUPPLIERID#", result[0].SUPPLIERID);

                                            //    var dataList = result[0].DetailList;
                                            //    var number = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].WEAVNO}</td>  
                                            //                     <td align='center'>${dataList[k].SUBBATCHNO}</td>
                                            //                     <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].STORAGEID}</td>
                                            //                     <td align='center'>${dataList[k].REMARK}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr> `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td align='center'>合   计：</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>${number}</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                    </tr>`;
                                            //}
                                            ////整经退料入库
                                            //else if (progId == "stk.WarpStockReturn") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#BILLDATE#", result[0].BILLDATE);

                                            //    var dataList = result[0].DetailList;
                                            //    var number = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].WARPNO}</td>  
                                            //                     <td align='center'>${dataList[k].SUBBATCHNO}</td>
                                            //                     <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].STORAGEID}</td>
                                            //                     <td align='center'>${dataList[k].REMARK}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr> `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td align='center'>合   计：</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>${number}</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                    </tr>`;
                                            //}
                                            ////织造退料入库
                                            //else if (progId == "stk.WeavStockReturn") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#BILLDATE#", result[0].BILLDATE);

                                            //    var dataList = result[0].DetailList;
                                            //    var number = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].WEAVNO}</td>  
                                            //                     <td align='center'>${dataList[k].SUBBATCHNO}</td>
                                            //                     <td align='center'>${dataList[k].MATERIALNAME}</td>  
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].STORAGEID}</td>
                                            //                     <td align='center'>${dataList[k].REMARK}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr> `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td align='center'>合   计：</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>${number}</td>
                                            //                        <td>&nbsp;</td> 
                                            //                        <td>&nbsp;</td> 
                                            //                    </tr>`;
                                            //}


                                            //content = content.replace("#BUSLOGISTICSINFORMATIONDETAIL#", printhtml);
                                            //LODOP.ADD_PRINT_HTM(1, 1, "100%", "100%", content);
                                            //LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小
                                            //LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);//横向时的正向显示
                                            //LODOP.PREVIEW();
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                        }
                    });
                }
                else if (progId == "stk.HalfWeavStockOut") {
                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                Ext.Ajax.request({
                                    url: '/api/halfproductmanagement/PrintExcelBill',
                                    jsonData: { handle: value, progId: progId, batchParams: batchParams },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.Message != null) {
                                            Ext.Msg.alert("提示", result.Message);
                                            getBillListing();
                                        }
                                        else {
                                            var fileName = result;
                                            if (fileName && fileName !== '') {
                                                DesktopApp.IgnoreSkip = true;
                                                try {
                                                    window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                                    getBillListing();
                                                } finally {
                                                    DesktopApp.IgnoreSkip = false
                                                }
                                            }
                                            //var fileName = result;
                                            //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            ////LODOP.PRINT_INITA(0, 0, "100%", "100%", "打印控件功能演示_Ext");
                                            //var content = "";
                                            //var printhtml = "";
                                            ////色织布发出
                                            //if (progId == "stk.HalfWeavStockOut") {
                                            //    content = result[0].content;
                                            //    //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                            //    var dataList = result[0].DetailList;
                                            //    content = content.replace("#BILLNO#", result[0].BILLNO)
                                            //        .replace("#BILLDATE#", result[0].BILLDATE)
                                            //        .replace("#SUPPLIERNAME#", result[0].SUPPLIERNAME)
                                            //        .replace("#AFTERWAYNAME#", dataList[0].AFTERWAYNAME)
                                            //        .replace("#ENDAFTERWAYNAME#", dataList[0].ENDAFTERWAYNAME);

                                            //    var number = 0;
                                            //    var rollnum = 0;
                                            //    for (var k = 0; k < dataList.length; k++) {
                                            //        printhtml += `<tr> 
                                            //                     <td align='center'>${dataList[k].PRODUCTID}</td>  
                                            //                     <td align='center'>${dataList[k].QUANTITY}</td>
                                            //                     <td align='center'>${dataList[k].ROLLNUM}</td>
                                            //                     <td align='center'>${dataList[k].REMARKS}</td>
                                            //                   </tr > `;
                                            //        number += dataList[k].QUANTITY;
                                            //        rollnum += dataList[k].ROLLNUM;
                                            //    }
                                            //    if (dataList.length < 8) {
                                            //        for (var index = 0; index < 8 - dataList.length; index++) {
                                            //            printhtml += `<tr> 
                                            //                         <td align='center'>&nbsp;</td>  
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                         <td align='center'>&nbsp;</td>
                                            //                       </tr> `;
                                            //        }
                                            //    }
                                            //    printhtml += `      <tr> 
                                            //                        <td>合   计：</td>
                                            //                        <td>${number}</td>
                                            //                        <td>${rollnum}</td> 
                                            //                        <td></td> 
                                            //                    </tr>`;
                                            //}


                                            //content = content.replace("#BUSLOGISTICSINFORMATIONDETAIL#", printhtml);
                                            //LODOP.ADD_PRINT_HTM(1, 1, "100%", "100%", content);
                                            //LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小
                                            //LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);//横向时的正向显示
                                            //LODOP.PREVIEW();
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                        }
                    });
                }
                else if (progId == "stk.HalfDyeStockOut") {
                    Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                        if (btn == "yes") {
                            call.apply(this);
                            function call() {
                                var personName = Ext.util.Cookies.get("loginPersonName");
                                Ext.Ajax.request({
                                    url: '/api/halfproductmanagement/PrintDyeProductExcelBill',
                                    jsonData: { paramValue: value, personName: personName, progId: progId },
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (result.Message != null) {
                                            Ext.Msg.alert("提示", result.Message);
                                            getBillListing();
                                        }
                                        else {
                                            var fileName = result;
                                            if (fileName && fileName !== '') {
                                                DesktopApp.IgnoreSkip = true;
                                                try {
                                                    window.location.href = '/TempData/ExportData/' + fileName;
                                                    getBillListing();
                                                } finally {
                                                    DesktopApp.IgnoreSkip = false
                                                }
                                            }
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
        //多打流水号
        var MoreSerial = Ext.create(Ext.Action, {
            text: '多打流水号',
            //iconCls: 'fa fa-download',
            //hidden: contains(permissionList, 6666, false, 'MoreSerial', defineItems),
            handler: function () {
                var batchParams = [];
                //var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "请选择一条数据");
                        return false;
                    }
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        //var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            //pk.push(value);
                            var PRODUCTID = records[i].get("PRODUCTID");
                            var weavno = records[i].get("WEAVNO");
                            if (weavno == "") {
                                Ext.Msg.alert("提示", "该织造计划暂未织造下单");
                                return false;
                            }
                            else {
                                batchParams.push({
                                    BILLNO: value,
                                    PRODUCTID: PRODUCTID
                                });
                            }
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                //queryCondition = { QueryFields: batchParams };

                Ax.utils.LibVclSystemUtils.openDataFunc("pls.WeavMoreSerialFunc", "多打流水号", [this, batchParams]);

            }
        });
        //多打流水号（外购单）
        var MoreSerialOutOrder = Ext.create(Ext.Action, {
            text: '多打流水号',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "请选择一条数据");
                        return false;
                    }
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {

                        batchParams.push({
                            BILLNO: records[i].get("BILLNO")
                        });
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }

                Ax.utils.LibVclSystemUtils.openDataFunc("pls.OutsourcingSerialNoFunc", "多打流水号", [this, batchParams]);

            }
        });

        //
        var WeavOrder = Ext.create(Ext.Action, {
            text: '织造下单',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var WEAVWAY = -1;
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            var temp = records[i].get("CURRENTSTATE");
                            if (temp !=2) {
                                Ext.Msg.alert("提示", "生效后才能织造下单");
                                return false;
                            }
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一条数据");
                    return false;
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ax.utils.LibVclSystemUtils.openBill("pls.UpdateDevice", BillTypeEnum.Bill, "织造下单", BillActionEnum.AddNew, undefined, undefined, {
                        progId: "pls.UpdateDevice", progName: "织造下单", BILLNO: batchParams.join(','), WEAVWAY: WEAVWAY, callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });

        var batchChangeSupplierID = Ext.create(Ext.Action, {
            text: '批量修改供应商',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var WEAVWAY = -1;
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一条数据");
                    return false;
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ax.utils.LibVclSystemUtils.openBill("pls.UpdateSupplier", BillTypeEnum.Bill, "批量修改供应商", BillActionEnum.AddNew, undefined, undefined, {
                        progId: "pls.UpdateSupplier", progName: "批量修改供应商", BILLNO: batchParams.join(','), callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });

        //有单调拨
        var AddZHOU = Ext.create(Ext.Action, {
            text: '轴号',
            //iconCls: 'fa fa-download',
            //hidden: contains(permissionList, 6666, false, 'Allocation', defineItems),
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();

                if (records.length == 1) {
                    var msgTemplate = "<table border = '0' cellspacing='0'  cellpadding='0'>";
                    /*           for (var i = 0; i < records.length; i++) {*/
                    //var pk = [];
                    //var pkStr = gridPanel.Pks[0];
                    //var value = records[i].get("BARCODE");
                    //for (var k = 0; k < records.length; k++) {
                    //    if (records[i].get("PRODUCTID") != records[k].get("PRODUCTID")) {
                    //        Ext.Msg.alert("提示", "存在产品不一致的信息,请重新选择");
                    //        return false;
                    //    }
                    //}


                    //pk.push(value);
                    //msgTemplate += "<tr>";
                    //msgTemplate += "<td> 流水号:" + value + "</td>";
                    //msgTemplate += "<td width='30px'></td>";
                    //msgTemplate += "<td> 数量:" + records[i].get("QUANTITY"); + "</td>";
                    //msgTemplate += "</tr>";
                    //batchParams.push(pk);
                    /* }*/
                    msgTemplate += "<td>请输入轴号:</td>";
                    msgTemplate += "</table>";

                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一条数据");
                    return false;
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                Ext.Msg.prompt('添加轴号', msgTemplate, function (btn, text) {
                    if (btn == 'ok') {
                        //Ext.Msg.prompt('调拨单', '请输入数量:', function (btn, text) {
                        //    if (btn == 'ok') {
                        //        // process text value and close...
                        //    }
                        //});
                        Ext.Ajax.request({
                            url: '/api/halfproductmanagement/AddZHOU',
                            jsonData: { handle: records[0].get("BILLNO"), progId: text, batchParams: batchParams, personId: personId },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Message != null) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                });
            }
        });

        //有单调拨
        var Allocation = Ext.create(Ext.Action, {
            text: '有单调拨',
            //iconCls: 'fa fa-download',
            //hidden: contains(permissionList, 6666, false, 'Allocation', defineItems),
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var msgTemplate = "<table border = '0' cellspacing='0'  cellpadding='0'>";
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get("BARCODE");
                        for (var k = 0; k < records.length; k++) {
                            if (records[i].get("PRODUCTID") != records[k].get("PRODUCTID")) {
                                Ext.Msg.alert("提示", "存在产品不一致的信息,请重新选择");
                                return false;
                            }
                        }

                        if (parseInt(records[i].get("BCPSTATE")) == 2 || parseInt(records[i].get("BCPSTATE")) == 5) {
                            Ext.Msg.alert("提示", "发出状态的不能调拨");
                            return false;
                        }

                        pk.push(value);
                        msgTemplate += "<tr>";
                        msgTemplate += "<td> 流水号:" + value + "</td>";
                        msgTemplate += "<td width='30px'></td>";
                        msgTemplate += "<td> 数量:" + records[i].get("QUANTITY"); + "</td>";
                        msgTemplate += "</tr>";
                        batchParams.push(pk);
                    }
                    msgTemplate += "<td>请输入调入订单号:</td>";
                    msgTemplate += "</table>";

                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                Ext.Msg.prompt('调拨单', msgTemplate, function (btn, text) {
                    if (btn == 'ok') {
                        //Ext.Msg.prompt('调拨单', '请输入数量:', function (btn, text) {
                        //    if (btn == 'ok') {
                        //        // process text value and close...
                        //    }
                        //});
                        Ext.Ajax.request({
                            url: '/api/halfproductmanagement/judgeproduct',
                            jsonData: { handle: records[0].get("PRODUCTID"), progId: "stk.HalfAccountDetail", value: text, personId: personId },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Success) {
                                    Ext.Ajax.request({
                                        url: '/api/halfproductmanagement/doallocation',
                                        jsonData: { handle: UserHandle, progId: text, batchParams: batchParams, personId: personId },
                                        method: 'POST',
                                        async: false,
                                        timeout: 90000000,
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText);
                                            if (result.Message != null) {
                                                Ext.Msg.alert("提示", result.Message);
                                                getBillListing();
                                            }
                                        },
                                        failure: function (response) {
                                            Ext.Msg.alert("提示", "方法调用失败");
                                        }
                                    });
                                }
                                else {
                                    Ext.Msg.alert("提示", result.Message);
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                });
            }
        });

        //半成品产品转换
        var HalfChangeProduct = Ext.create(Ext.Action, {
            text: '产品型号转换',
            handler: function () {

                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                Ext.Ajax.request({
                    url: 'api/common/verpermission',
                    jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "HalfChangeProduct" },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (result.Success) {
                            var batchParams = [];
                            var totalQuantity = 0;
                            var personId = Ext.util.Cookies.get("loginPersonId");
                            var records = gridPanel.getView().getSelectionModel().getSelection();
                            if (records.length > 0) {
                                var msgTemplate = "<table border = '0' cellspacing='0'  cellpadding='0'>";
                                for (var i = 0; i < records.length; i++) {
                                    var value = records[i].get("BARCODE");
                                    var pk = [];
                                    for (var k = 0; k < records.length; k++) {
                                        if (records[i].get("PRODUCTID") != records[k].get("PRODUCTID")) {
                                            Ext.Msg.alert("提示", "存在产品不一致的信息,请重新选择");
                                            return false;
                                        }
                                    }

                                    if (parseInt(records[i].get("BCPSTATE")) == 2 || parseInt(records[i].get("BCPSTATE")) == 5) {
                                        Ext.Msg.alert("提示", "发出状态的不能进行产品型号转换");
                                        return false;
                                    }

                                    pk = value;
                                    batchParams.push(pk);
                                    msgTemplate += "<tr>";
                                    msgTemplate += "<td> 流水号:" + value + "</td>";
                                    msgTemplate += "<td width='30px'></td>";
                                    msgTemplate += "<td> 数量:" + records[i].get("QUANTITY"); + "</td>";
                                    msgTemplate += "</tr>";

                                    totalQuantity = (parseFloat(totalQuantity) + parseFloat(records[i].get("QUANTITY"))).toFixed(1);
                                }
                                msgTemplate += "<tr>";
                                msgTemplate += "<td>合计数量:" + totalQuantity + "　卷数：" + records.length + "</td>";
                                msgTemplate += "</tr>";
                                msgTemplate += "</table>";

                            }
                            else if (records.length == 0) {
                                Ext.Msg.alert("提示", "未选择数据");
                                return false;
                            }
                            HalfProductChangeFunc(batchParams, msgTemplate, UserHandle, personId);

                            //Ext.Msg.prompt('产品型号转换', msgTemplate, function (btn, text,text2) {
                            //    if (btn == 'ok') {
                            //        Ext.Ajax.request({
                            //            url: '/api/halfproductmanagement/ChangeProductId',
                            //            jsonData: { handle: UserHandle, value: text, batchParams: batchParams, personId: personId },
                            //            method: 'POST',
                            //            async: false,
                            //            timeout: 90000000,
                            //            success: function (response) {
                            //                var result = Ext.decode(response.responseText);
                            //                if (result.Message != null) {
                            //                    Ext.Msg.alert("提示", result.Message);
                            //                    getBillListing();
                            //                }
                            //            },
                            //            failure: function (response) {
                            //                Ext.Msg.alert("提示", "方法调用失败");
                            //            }
                            //        });
                            //    }
                            //}, this, 120, true);
                        }
                        else {
                            Ext.Msg.alert("提示", result.Message);
                        }
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        });
        //计算产量
        var doCalculateYield = Ext.create(Ext.Action, {
            text: '计算产量',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'doComplete', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/afterwaymanagement/DoCalculateYield',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personid: personid },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //单据批量修改
        var BatchModify = Ext.create(Ext.Action, {
            text: '批量修改',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'doComplete', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        //var pk = [];
                        //for (var r = 0; r < count; r++) {
                        //    var pkStr = gridPanel.Pks[r];
                        //    var value = records[i].get(pkStr);
                        //    pk.push(value);
                        //}
                        //var pkStr = gridPanel.Pks[r];
                        var value = records[i].get("BILLNO");
                        batchParams.push(value);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                if (progId == "com.DyePrice") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("com.DyePriceFunc", "批量修改", [this, batchParams]);
                }

            }
        });
        // 设置底部状态
        var setStatusItem = Ext.create(Ext.Action, {
            text: '设置底部状态',
            iconCls: 'fa fa-save',
            //hidden: contains(permissionList, 0, true, 'setStatusItem', defineItems),
            handler: function () {
                Ax.utils.LibVclSystemUtils.openBill('com.StatusItem', BillTypeEnum.Bill, '设置底部状态', BillActionEnum.AddNew, undefined, undefined, { progId: progId, billType: billType });
            }
        });

        function GetCurrentDate() {
            var date = new Date();

            var year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
            var month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
            var day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
            return '' + year + month + '/' + day;//转换为字符串
        }

        //确认颜色
        var colorIsOK = Ext.create(Ext.Action, {
            text: '确认颜色',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }

                Ext.MessageBox.confirm("提示", "颜色确实是否OK？", function (btnId) {
                    if (btnId == "yes") {
                        Ext.Ajax.request({
                            url: '/api/supplierplatform/ColorIsOK',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personId: personId },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                    else if (btnId == "no") {
                        Ext.Ajax.request({
                            url: '/api/supplierplatform/ColorIsNG',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personId: personId },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                });
            }
        });
        //20210517 addbutton end

        function checkAllPermission() {
            var CheckAllPermission;
            Ext.Ajax.request({
                url: 'billSvc/checkAllPermission',
                method: 'POST',
                jsonData: {
                    handle: UserHandle, progId: progId
                },
                async: false,
                timeout: 90000000,
                success: function (response) {
                    var ret = Ext.decode(response.responseText)
                    CheckAllPermission = ret.CheckAllPermissionResult;
                },
                failure: function (response) {
                    CheckAllPermission = undefined;
                    console.log('权限按钮方法调用失败')
                    // Ext.Msg.alert("提示", "权限按钮方法调用失败");
                }
            })
            return CheckAllPermission;
        }
        function containsDefine(name, items) {
            if (items == undefined || items.length == 0)
                return false;
            else {
                for (var iIndex = 0; iIndex < items.length; ++iIndex) {
                    if (items[iIndex] == name)
                        return false;
                }
                return true;
            }
        }
        function contains(arr, obj, isDefault, name, items) {

            if (arr == undefined) {
                return containsDefine(name, items);
            }
            var i = arr.length;
            if (i == 0) {
                return containsDefine(name, items);
            }
            if (!isDefault) {
                while (i--) {
                    if (arr[i] === obj) {
                        return containsDefine(name, items);
                    }
                }
            } else {
                return containsDefine(name, items);
            }
            return true;
        }
        function invorkBatchBcf(methodName, cancel, callback) {
            var batchParams = [];
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                var batchMethod = [];
                var count = gridPanel.Pks.length;
                for (var i = 0; i < records.length; i++) {
                    var pk = [];
                    for (var r = 0; r < count; r++) {
                        var pkStr = gridPanel.Pks[r];
                        var value = records[i].get(pkStr);
                        pk.push(value);
                    }
                    if (cancel)
                        batchParams.push([Ext.encode(pk), Ext.encode(cancel)]);
                    else
                        batchParams.push([Ext.encode(pk)]);
                }
                call.apply(this);
            }
            else {
                Ext.Msg.alert("提示", "请先选择一行数据");
            }
            function call() {
                Ext.Ajax.request({
                    url: '/billSvc/invorkBatchBcf',
                    jsonData: { param: { ProgId: progId, MethodName: methodName, Handle: UserHandle }, batchParams: batchParams },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        result = Ext.decode(result.BatchExecBcfMethodResult);
                        if (callback) {
                            callback(result.Result);
                        }
                        if (result.Messages.length > 0) {
                            var ex = [];
                            for (var i = 0; i < result.Messages.length; i++) {
                                var msgKind = result.Messages[i].MessageKind;
                                ex.push({ kind: msgKind, msg: result.Messages[i].Message });
                            }
                            Ax.utils.LibMsg.show(ex);
                        };
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        };

        //成品出库单销售确认
        var fPSOutSaleConfirm = Ext.create(Ext.Action, {
            text: '销售确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleConfirm', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {

                    Ext.Ajax.request({
                        url: 'api/finishproductstock/VelSaleConfirmFPStockOut',
                        jsonData: { progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);

                            if (result.Success) {
                                saleconfirmfpstockoutFunc(progId, batchParams, personId);
                            }
                            else if (result.Result == "N") {
                                Ext.Msg.confirm("系统提示", result.Message, function (btn) {
                                    if (btn == "yes") {
                                        saleconfirmfpstockoutFunc(progId, batchParams, personId);
                                    }
                                });
                            } else {
                                Ext.Msg.alert("提示", result.Message);
                            }

                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        function saleconfirmfpstockoutFunc(progId, batchParams, personId) {
            Ext.Ajax.request({
                url: 'api/finishproductstock/saleconfirmfpstockout',
                jsonData: { progId: progId, batchParams: batchParams, personId: personId },
                method: 'POST',
                async: false,
                timeout: 90000000,
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    Ext.Msg.alert("提示", result.Message);
                    getBillListing();
                },
                failure: function (response) {
                    Ext.Msg.alert("提示", "方法调用失败");
                }
            });
        }

        //成品出库单反销售确认
        var fPSOutSaleConfirmNot = Ext.create(Ext.Action, {
            text: '反销售确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleConfirm', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/finishproductstock/notsaleconfirmfpstockout',
                        jsonData: { progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //成品出库单销售记账
        var fPSOutSaleBooking = Ext.create(Ext.Action, {
            text: '销售记账',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/finishproductstock/salebookingfpstockout',
                        jsonData: { progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //财务确认
        var FinanceConfirm = Ext.create(Ext.Action, {
            text: '财务确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var primaryKey = "";
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    primaryKey = gridPanel.Pks[0];
                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/common/financeconfirm',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, personName: personName, primaryKey: primaryKey, buttonId: "FinanceConfirm" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //财务反确认
        var FinanceConfirmNot = Ext.create(Ext.Action, {
            text: '财务反确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var primaryKey = "";
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    primaryKey = gridPanel.Pks[0];
                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/common/FinanceAuditNot',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, personName: personName, primaryKey: primaryKey, buttonId: "FinanceConfirmNot" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //优化导出
        var BtnExportNew = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-upload',
            text: '模板导出',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                //var personId = Ext.util.Cookies.get("loginPersonId");
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        if (progId == "Em.InboundOrder") {
                            batchParams.push(records[i].get("InBoundOrderNo"));
                        }
                        else if (progId == "Em.OutboundOrder") {
                            batchParams.push(records[i].get("OutBoundOrderNo"));
                        }
                        else if (progId == "Em.EquipInventory") {
                            batchParams.push(records[i].get("EquipInventoryNo"));
                        }
                        else if (progId == "Em.InventoryPostDetail") {
                            batchParams.push(records[i].get("InventoryPostDetailNo"));
                        }
                        else if (progId == "sm.SampleAccount") {
                            batchParams.push(records[i].get("RECORDID"));
                        }
                        else {
                            batchParams.push(records[i].get("BILLNO"));
                        }
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }

                function call() {
                    var data = { BillNos: batchParams, ProgId: progId };
                    Ext.Ajax.request({
                        url: 'api/EmMaterial/ExportNew',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/ExportData/EmMater/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //查物料台账
        var BtnSelectTaiZhang = Ext.create(Ext.Action, {
            text: '查台账',
            iconCls: 'fa fa-search',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条数据");
                    }
                    else {
                        var MATERIALID = records[0].get("MaterialNo");
                        Ax.utils.LibVclSystemUtils.openDataFunc("Em.InventoryPostFunc", "查台账", [MATERIALID]);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //财务审核
        var FinanceAuditConfirm = Ext.create(Ext.Action, {
            text: '审核',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var primaryKey = "";
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    primaryKey = gridPanel.Pks[0];
                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/common/financeconfirm',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, personName: personName, primaryKey: primaryKey, buttonId: "FinanceConfirm" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //财务反审核
        var FinanceAuditConfirmNot = Ext.create(Ext.Action, {
            text: '反审核',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var primaryKey = "";
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    primaryKey = gridPanel.Pks[0];
                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/common/FinanceAuditNot',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, personName: personName, primaryKey: primaryKey, buttonId: "FinanceConfirmNot" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //合并
        var MergeStockOut = Ext.create(Ext.Action, {
            text: '合并',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length <= 1) {
                        Ext.Msg.alert("提示", "需要2条以上的记录才能合并");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/finishproductstock/mergestockout',
                            jsonData: { progId: progId, batchParams: batchParams, personId: personId },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //成品出库单明细打印
        var fPSOutPrintProductInfo = Ext.create(Ext.Action, {
            text: '打印出库明细',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6668, false, 'fPSOutPrintProductInfo', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/finishproductstock/printstockoutdetail',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/FinishProductStockOut/Info/' + GetCurrentDate() + '/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //成品出库单汇总打印
        var fPSOutPrintProductSummary = Ext.create(Ext.Action, {
            text: '打印出库汇总',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6669, false, 'fPSOutPrintProductSummary', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/finishproductstock/printstockoutsummary',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/FinishProductStockOut/Summary/' + GetCurrentDate() + '/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //成品出库单LZB码单打印
        var fPSOutPrintLzbSummary = Ext.create(Ext.Action, {
            text: '打印LZB码单',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6669, false, 'fPSOutPrintProductSummary', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/finishproductstock/printstockoutlzb',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/FinishProductStockOut/LzbCode/' + GetCurrentDate() + '/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //成品出库单内销码单打印
        var PrintStockOutCodeIn = Ext.create(Ext.Action, {
            text: '内销码单导出',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6669, false, 'fPSOutPrintProductSummary', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/finishproductstock/PrintStockOutCodeIn',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/FinishProduct/InFinishProductStockOut/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //成品出库单外贸码单打印
        var PrintStockOutCodeOut = Ext.create(Ext.Action, {
            text: '外贸码单导出',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6669, false, 'fPSOutPrintProductSummary', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/finishproductstock/PrintStockOutCodeOut',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/FinishProduct/OutFinishProductStockOut/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //成品出库单汇总打印
        var PrintSampleCost = Ext.create(Ext.Action, {
            text: '导出成本表',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);
                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/StkSampleCloth/PrintSampleCostToExcel',
                            jsonData: { handle: UserHandle, progId: progId, paramValue: value },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Result;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.open('/TempData/ExportData/' + GetCurrentDate() + '/' + fileName);
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });


        //#region 导出客户下单信息
        var CustomerOrderProductExcel = Ext.create(Ext.Action, {
            text: '导出历史下单信息',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("CUSTOMERID");
                        batchParams.push(value);
                    }
                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/saleorder/CustomerOrderProductExcel',
                            jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "CustomerOrderProductExcel" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/SaleOrder/CustomerOrderProductExcel/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //半成品开剪打印小标签
        var HalfProductCutPrint = Ext.create(Ext.Action, {
            text: '打印小标签',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {

                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);
                        pk.push(value);
                        batchParams.push(pk);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/printlabel/halfproductcutprint',
                        jsonData: { progId: progId, batchParams: batchParams, handle: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result != null && result.Success) {
                                //打印
                                SmallPrintLabel(result.Enttity);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        /**
         * 查看疵点信息（半成品检验查看疵点信息）
         * */
        var halfProductShowDefect = Ext.create(Ext.Action, {
            text: '疵点',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var serialNo = records[0].get("SERIALNO");
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.HalfProductDefectInfoFunc", "疵点信息", [this, serialNo]);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //半成品补流水号打印
        var halfProductRepairPrint = Ext.create(Ext.Action, {
            text: '打印小标签',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {

                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);
                        pk.push(value);
                        batchParams.push(pk);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {

                    Ext.Ajax.request({
                        url: 'api/printlabel/qchalfproductrepairprint',
                        jsonData: { progId: progId, batchParams: batchParams, handle: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result != null && result.Success) {

                                SmallPrintLabel(result.Enttity);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //成品补流水号打印
        var finishProductRepairPrint = Ext.create(Ext.Action, {
            text: '打印小标签',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {

                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);
                        pk.push(value);
                        batchParams.push(pk);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/printlabel/qcfinishproductrepairprint',
                        jsonData: { progId: progId, batchParams: batchParams, handle: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result != null && result.Success) {
                                //打印
                                SmallPrintLabel(result.Enttity);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //成品退货条码号打印（小标签）
        var productReturnPrint = Ext.create(Ext.Action, {
            text: '打印小标签',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {

                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);
                        pk.push(value);
                        batchParams.push(pk);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/printlabel/productreturnprint',
                        jsonData: { progId: progId, batchParams: batchParams, handle: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result != null && result.Success) {
                                //打印
                                SmallPrintLabel(result.Enttity);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //成品条码号打印（小标签）
        var productStockPrint = Ext.create(Ext.Action, {
            text: '打印小标签',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {

                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);
                        pk.push(value);
                        batchParams.push(pk);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/printlabel/productstockprint',
                        jsonData: { progId: progId, batchParams: batchParams, handle: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result != null && result.Success) {
                                //打印
                                SmallPrintLabel(result.Enttity);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //开票
        var InvoiceOut = Ext.create(Ext.Action, {
            text: '开票',
            iconCls: 'fa fa-print',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var vSheetId = [];
                var b = true;
                var customerId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {

                        vSheetId.push(records[i].get("SHEETID"));
                        if (customerId == "") {
                            customerId = records[i].get("CUSTOMERID");
                        }

                        if (records[i].get("ACCOUNTCAUSE") != "发货") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 发货 的才能开票");
                            break;
                        }
                        if (records[i].get("INVOICEFLAG") == "1" || records[i].get("INVOICEFLAG") == 1) {
                            b = false;
                            Ext.Msg.alert("提示", "选中的单据中存在已开票的");
                            break;
                        }

                        if (customerId != records[i].get("CUSTOMERID")) {
                            b = false;
                            Ext.Msg.alert("提示", "请选择 同一个客户 开票");
                            break;
                        }
                    }

                    if (vSheetId == null || vSheetId.length == 0) {
                        Ext.Msg.alert("提示", "请选择开票单据");
                        b = false;
                    }

                    if (b) {
                        Ax.utils.LibVclSystemUtils.openBill("sal.Invoice", BillTypeEnum.Bill, "开票", BillActionEnum.AddNew, undefined, undefined, { progId: "sal.Invoice", progName: "开票", sheetIds: vSheetId, typeId: 0 });
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        var NotInvoiceOut = Ext.create(Ext.Action, {
            text: '开票',
            iconCls: 'fa fa-print',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var vSheetId = [];
                var b = true;
                var customerId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        vSheetId.push(records[i].get("SHEETID"));
                        if (customerId == "") {
                            customerId = records[i].get("CUSTOMERID");
                        }
                        //if (records[i].get("CURRENTSTATE") != 2 && records[i].get("CURRENTSTATE") != "2") {
                        //    b = false;
                        //    Ext.Msg.alert("提示", "只有 生效 的才能开票");
                        //    break;
                        //}
                        if (records[i].get("STATE") != 0 && records[i].get("STATE") != "0") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 未开 的才能开票");
                            break;
                        }
                        //if (customerId != records[i].get("CUSTOMERID")) {
                        //    b = false;
                        //    Ext.Msg.alert("提示", "请选择 同一个客户 开票");
                        //    break;
                        //}

                    }
                    if (b) {
                        if (vSheetId == null || vSheetId.length == 0) {
                            Ext.Msg.alert("提示", "请选择开票单据");
                            b = false;
                        }
                        if (vSheetId.length > 1) {
                            Ext.Msg.alert("提示", "只能选择一条单据进行开票");
                            b = false;
                        }

                        if (b) {
                            Ax.utils.LibVclSystemUtils.openBill("sal.Invoice", BillTypeEnum.Bill, "开票", BillActionEnum.AddNew, undefined, undefined, { progId: "sal.Invoice", progName: "开票", sheetIds: vSheetId, typeId: 1 });
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //订单结束
        var saleOrderEnd = Ext.create(Ext.Action, {
            text: '订单结束',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BILLNO");
                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Msg.confirm("系统提示", "您确定要把选中的订单设置结束吗？", function (btn) {
                        if (btn == "yes") {
                            Ext.Ajax.request({
                                url: 'api/saleorder/saleorderend',
                                jsonData: { progId: progId, saleOrderList: batchParams, personId: personId, buttonId: "SaleOrderEnd" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result != null && result.Success) {
                                        //打印
                                        Ext.Msg.alert("提示", "设置成功！");
                                    }
                                    else {
                                        Ext.Msg.alert("提示", result.Message);
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    });
                }
            }
        });

        //标签配置
        var labelConfiguration = Ext.create(Ext.Action, {
            text: '标签配置',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var customerId = "";
                var orderId = "";
                var LabelFormatId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选一条数据");
                    return false;
                }
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BILLNO");
                        customerId = records[i].get("CUSTOMERID");
                        orderId = records[i].get("BILLNO");
                        LabelFormatId = records[i].get("LabelFormatId");
                        batchParams.push(value);
                    }
                    Ext.Ajax.request({
                        url: 'api/saleorder/VelUserPower',
                        jsonData: {
                            PersonId: personId, CodeId: orderId
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result != null && result.Success) {
                                //打印
                                call.apply(this);
                            }
                            else {
                                Ext.Msg.alert("提示", "您没有配置该订单标签的权限");
                            }
                        },
                        failure: function (response) {
                        }
                    });

                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ax.utils.LibVclSystemUtils.openBill("com.LabelFormatStandard", BillTypeEnum.Bill, "标签", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this.progId, customerId: customerId, orderId: orderId, LabelFormatId: LabelFormatId, SaleOrderCallback: function () {
                            getBillListing();
                        }
                    });
                }
            }
        });


        //货运管理明细打印
        var goodsTrafficProductInfo = Ext.create(Ext.Action, {
            text: '打印明细',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6668, false, 'fPSOutPrintProductInfo', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/printstockoutdetail',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/GoodsTraffic/Info/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //货运管理汇总打印
        var GoodsTrafficProductSummary = Ext.create(Ext.Action, {
            text: '打印汇总',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6669, false, 'fPSOutPrintProductSummary', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/printgoodstrafficsummary',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/GoodsTraffic/Summary/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //货运管理LZB码单打印
        var GoodsTrafficLzbSummary = Ext.create(Ext.Action, {
            text: '打印LZB明细',
            iconCls: 'fa fa-print',
            //hidden: contains(permissionList, 6669, false, 'fPSOutPrintProductSummary', defineItems),
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var pk = [];
                    var pkStr = gridPanel.Pks[0];
                    var value = records[0].get(pkStr);
                    pk.push(value);

                    batchParams.push(pk);

                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/printgoodstrafficlzb',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/GoodsTraffic/LzbCode/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能单选打印"); }
            }
        });

        //打印发票A
        var InvoiceAPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '发票A',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/InvoiceAPrint", 0);
            }
        });


        //打印发票B
        var InvoiceBPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '发票B',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/InvoiceBPrint", 0);
            }
        });

        //明细表B-》外销订单
        var ExportTradeDetailedPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '明细表B',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/ExportTradeDetailedPrint", 0);
            }
        });

        //明细表A-》内销订单
        var InTradeDetailedPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '明细表A',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/InTradeDetailedPrint", 0);
            }
        });

        //装箱单a
        var PackBillAPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '装箱单A',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/PackBillAPrint", 0);
            }
        });

        //装箱单B
        var PackBillPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '装箱单B',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/PackBillPrint", 1);
            }
        });

        //打印发票C
        var InvoiceCPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '发票C',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/InvoiceCPrint", 1);
            }
        });

        //发货单明细
        var ProductModelPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '打印码单',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/ProductModelPrint", 1);
            }
        });

        //发货单汇总
        var ProductModelTotalPrint = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '打印汇总',
            handler: function () {
                GoodsTrafficExportExcel("api/goodstraffic/ProductModelTotalPrint", 1);
            }
        });

        //#region 货运管理打印功能
        /**
         * 货运管理打印功能
         * @param {any} url 地址
         * @param {any} typeId 类型（1：多选， 0:单选）
         */
        var GoodsTrafficExportExcel = function (url, typeId) {
            var sheetId = "";
            var bacthSheetId = [];
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                if (typeId == 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能单选打印");
                        return;
                    }
                    else {
                        sheetId = records[0].get("SHEETID");
                    }
                }
                else {
                    for (var m = 0; m < records.length; m++) {
                        bacthSheetId.push(records[m].get("SHEETID"));
                    }
                }
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
                return;
            }

            call.apply(this);
            function call() {
                Ext.Ajax.request({
                    url: url,
                    jsonData: { handle: UserHandle, progId: progId, paramValue: typeId == 0 ? sheetId : bacthSheetId },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (!result.Success) {
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        }
                        else {
                            var fileName = result.Enttity;
                            if (fileName && fileName !== '') {
                                DesktopApp.IgnoreSkip = true;
                                try {
                                    window.location.href = '/TempData/GoodsTraffic/' + fileName;
                                } finally {
                                    DesktopApp.IgnoreSkip = false
                                }
                            }
                        }
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        }
        //#endregion

        //货运管理财务确认
        var GoodsTrafficFinanceConfirm = Ext.create(Ext.Action, {
            text: '财务确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/financeconfirm',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, buttonId: "GoodsTrafficFinanceConfirm" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //货运管理财务反确认
        var GoodsTrafficFinanceConfirmNot = Ext.create(Ext.Action, {
            text: '财务反确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/FinanceConfirmNot',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, personName: personName, buttonId: "FinanceConfirmNot" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //货运管理销售记账
        var GoodsTrafficSaleBookingNot = Ext.create(Ext.Action, {
            text: '反销售确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    //if (batchParams.length > 1) {
                    //    Ext.Msg.alert("提示", "只能选择一条记录");
                    //}
                    //else {
                    Ext.Ajax.request({
                        url: 'api/goodstraffic/GoodsTrafficSaleBookingNot',
                        jsonData: { progId: progId, objIds: batchParams, personId: personId, personName: personName, buttonId: "GoodsTrafficSaleBooking" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                    /*   }*/
                }
            }
        });

        //货运管理销售记账
        var GoodsTrafficSaleBooking = Ext.create(Ext.Action, {
            text: '销售确认',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/GoodsTrafficSaleBooking',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, personName: personName, buttonId: "GoodsTrafficSaleBooking" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //货运管理合并
        var MergeGoodsTraffic = Ext.create(Ext.Action, {
            text: '合并',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length <= 1) {
                        Ext.Msg.alert("提示", "需要2条以上的记录才能合并");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/mergegoodstraffic',
                            jsonData: { progId: progId, objIds: batchParams, personId: personId, buttonId: "MergeGoodsTraffic" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });

        //外织造开票
        var OutherWeaveInvoice = Ext.create(Ext.Action, {
            text: '开票',
            iconCls: 'fa fa-save',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/outherweave/billinvoice',
                        jsonData: { progId: progId, objIds: batchParams, personId: personId, buttonId: "OutherWeaveInvoice" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //销售确认
        var CommonSaleConfirm = Ext.create(Ext.Action, {
            text: '销售确认',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            batchParams.push(value);
                        }
                    }
                    call.apply(this);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "抱歉，只能选中一条单据");
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/common/commonsaleaudit',
                        jsonData: { progId: progId, objIds: batchParams, personId: personId, buttonId: "CommonSaleConfirm" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //销售反确认
        var CommonUnSaleConfirm = Ext.create(Ext.Action, {
            text: '销售反确认',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            batchParams.push(value);
                        }
                    }
                    call.apply(this);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "抱歉，只能选中一条单据");
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/common/commonunsaleaudit',
                        jsonData: { progId: progId, objIds: batchParams, personId: personId, buttonId: "CommonUnSaleConfirm" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //导出发货单（零剪）
        var ZeroshearPrint = Ext.create(Ext.Action, {
            text: '导出发货单',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            batchParams.push(value);
                        }
                    }
                    call.apply(this);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "抱歉，只能选中一条单据");
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/zeroshear/printdata',
                        jsonData: { paramValue: batchParams[0] },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/ZeroShear/ZeroShearExcel/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //导出备品备件入库单
        var ParePartsStockInPrint = Ext.create(Ext.Action, {
            text: '入库单',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            batchParams.push(value);
                        }
                    }
                    call.apply(this);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "抱歉，只能选中一条单据");
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/pareparts/getparepartsstockin',
                        jsonData: { paramValue: batchParams[0] },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/PareParts/Info/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //失效标签记录
        var CancelBigLabel = Ext.create(Ext.Action, {
            text: '设为失效',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");
                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Msg.confirm('系统提示', '确定要失效该标签记录吗？', function (btn) {
                        if (btn === 'yes') {
                            Ext.Ajax.request({
                                url: 'api/qccheckfinishproduct/CancelBigLabel',
                                jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "CancelBigLabel" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    });
                }
            }
        });

        //导出退货通知单
        var ReturnGoodsExport = Ext.create(Ext.Action, {
            text: '导出通知单',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("SheetId");
                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "抱歉，只能选中一条单据");
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/StkReturnGoods/StkReturnGoodsExcel',
                        jsonData: { progId: progId, paramValue: batchParams[0], personId: personId, buttonId: "ReturnGoodsExport" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/StkReturnGoods/ReturnGoodsExcel/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //退货单处理
        var ReturnGoodsDealWith = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',

            text: '处理',
            handler: function () {
                var bState = false;
                var batchParams = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一条数据");
                }
                else if (records.length > 0) {
                    batchParams = records[0].get("SheetId");
                    bState = true;
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {

                    Ext.MessageBox.show({
                        title: '退货单处理',                 //对话框标题;
                        width: 350,
                        buttons: Ext.MessageBox.OKCANCEL,    //对话框的按钮,Ext.MessageBox已预置;
                        msg: "处理意见",
                        multiline: true,                     //允许多行;
                        fn: function (btn, text) {           //回调函数;
                            if (btn == 'ok') {
                                ReturnGoodsDealWithFunc(batchParams, text, "ReturnGoodsDealWith");
                            }
                        }
                    });

                }
            }
        });
        //退货单处理调用方法
        var ReturnGoodsDealWithFunc = function (sheetId, conent, buttonId) {
            var personId = Ext.util.Cookies.get("loginPersonId");
            Ext.Ajax.request({
                url: 'api/StkReturnGoods/DealWith',
                jsonData: { progId: progId, SheetId: sheetId, Content: conent, personId: personId, buttonId: buttonId },
                method: 'POST',
                async: false,
                timeout: 90000000,
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (!result.Success) {
                        Ext.Msg.alert("提示", result.Message);
                    }
                    else {
                        Ext.Msg.alert("提示", "处理成功！");
                    }
                    getBillListing();
                },
                failure: function (response) {
                    Ext.Msg.alert("提示", "方法调用失败");
                }
            });
        };

        var FpStockAllocationApply = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            //hidden: contains(permissionList, 32, false, 'backrelease', defineItems),
            text: '成品调拨',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        if (productId == "") {
                            productId = records[i].get("PRODUCTID");
                        }
                        else {
                            if (productId != records[i].get("PRODUCTID")) {
                                Ext.Msg.alert("提示", "只能选择同一个产品型号");
                                bState = false;
                                break;
                            }
                        }
                        if (records[i].get("PRODUCTSTATE") != 0) {
                            Ext.Msg.alert("提示", "只能选择 成品状态是 仓库中 的产品");
                            bState = false;
                            break;
                        }
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ext.Msg.prompt('调拨单', "请输入调入的订单号", function (btn, text) {
                        if (btn == 'ok') {
                            var personId = Ext.util.Cookies.get("loginPersonId");
                            var personName = Ext.util.Cookies.get("loginPersonName");
                            Ext.Ajax.request({
                                url: 'api/StkFpAllocationApply/ButchAddFpAllocationApply',
                                jsonData: { progId: progId, paramValue: barCodeList, personId: personId, personName: personName, commonField: text, buttonId: "FpStockAllocationApply" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Message != null) {
                                        Ext.Msg.alert("提示", result.Message);
                                        getBillListing();
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    });
                }
            }
        });

        //移库（成品仓移库）
        var FpStockTransferLibrary = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '移库',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.TransferLibrary", BillTypeEnum.Bill, "移库", BillActionEnum.AddNew, undefined, undefined, { progId: this, barCode: barCodeList, SourceType: 1, callbackFunc: function () { getBillListing(); } });
                }
            }
        });

        //转无单（成品仓转无单）
        var FpStockNoOrder = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '转无单',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.NoOrder", BillTypeEnum.Bill, "转为无单", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        barCodelList: barCodeList,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });

        //转无单（半成品仓转无单）
        var HalfStockNoOrder = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '转无单',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));

                        if (parseInt(records[i].get("BCPSTATE")) == 2 || parseInt(records[i].get("BCPSTATE")) == 5) {
                            Ext.Msg.alert("提示", "发出状态的不能转无单");
                            return false;
                        }
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.HalfProductNoOrder", BillTypeEnum.Bill, "转为无单", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        serialNoList: barCodeList,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });

        //变更委外单信息
        var UpdateHalfPrice = Ext.create(Ext.Action, {
            text: '单价变更',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "请选择一条数据");
                        return false;
                    }
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        //var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);

                            //var weavno = records[i].get("WEAVNO");
                            //if (weavno == "") {
                            //    Ext.Msg.alert("提示", "该织造计划暂未织造下单");
                            //    return false;
                            //}
                            //else
                            {
                                batchParams.push({
                                    BILLNO: value
                                    , PROGID: progId
                                });
                            }
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                //queryCondition = { QueryFields: batchParams };

                Ax.utils.LibVclSystemUtils.openDataFunc("sp.UpdateHalfPriceFunc", "单价变更", [this, batchParams]);

            }
        });



        //变更委外单信息
        var UpdateOutPrice = Ext.create(Ext.Action, {
            text: '单价变更',

            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "请选择一条数据");
                        return false;
                    }
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        //var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);

                            //var weavno = records[i].get("WEAVNO");
                            //if (weavno == "") {
                            //    Ext.Msg.alert("提示", "该织造计划暂未织造下单");
                            //    return false;
                            //}
                            //else
                            {
                                batchParams.push({
                                    BILLNO: value
                                    , PROGID: progId
                                });
                            }
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                //queryCondition = { QueryFields: batchParams };

                Ax.utils.LibVclSystemUtils.openDataFunc("sp.UpdatePriceFunc", "单价变更", [this, batchParams]);

            }
        });

        //变更委外单信息
        var UpdateOutOrder = Ext.create(Ext.Action, {
            text: '变更',

            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "请选择一条数据");
                        return false;
                    }
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        //var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);

                            //var weavno = records[i].get("WEAVNO");
                            //if (weavno == "") {
                            //    Ext.Msg.alert("提示", "该织造计划暂未织造下单");
                            //    return false;
                            //}
                            //else
                            {
                                batchParams.push({
                                    BILLNO: value
                                    , PROGID: progId
                                });
                            }
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                //queryCondition = { QueryFields: batchParams };

                Ax.utils.LibVclSystemUtils.openDataFunc("sp.OutOrderUpdateFunc", "委外单变更", [this, batchParams]);

            }
        });

        //调到待发染色库
        var WaitDyeStock = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '调到待发染色库',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        batchParams.push(records[i].get("BARCODE"));

                        if (parseInt(records[i].get("BCPSTATE")) == 2 || parseInt(records[i].get("BCPSTATE")) == 5) {
                            Ext.Msg.alert("提示", "发出状态的不能进行该操作");
                            return false;
                        }
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }

                function call() {
                    var data = { objIds: batchParams, progId: progId, personName: personName, personId: personId, buttonId: "WaitDyeStock" };
                    Ext.Ajax.request({
                        url: 'api/WaitDyeStock/VelHalfProduct',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                var enttity = result.Enttity;
                                if (enttity == 1) {
                                    Ext.Msg.alert("提示", result.Message);
                                }
                                else if (enttity == 2) {
                                    Ext.Msg.confirm("系统提示", result.Message, function (btn) {
                                        if (btn == "yes") {
                                            WaitDyeStockFunc(data, function () {
                                                Ext.Msg.alert("提示", "处理成功！");
                                                getBillListing();
                                            });
                                        }
                                    });
                                }
                            }
                            else {
                                WaitDyeStockFunc(data, function () {
                                    Ext.Msg.alert("提示", "处理成功！");
                                    getBillListing();
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //调到待发染色库 实现方法
        var WaitDyeStockFunc = function (data, callbackFunc) {
            Ext.Ajax.request({
                url: 'api/WaitDyeStock/AddHalfWaitDyeStockIn',
                jsonData: data,
                method: 'POST',
                async: false,
                timeout: 90000000,
                success: function (response) {
                    var result = Ext.decode(response.responseText);

                    if (result != null && result.Success) {
                        callbackFunc();
                    }
                    else {
                        Ext.Msg.alert("提示", result.Message);
                    }
                },
                failure: function (response) {
                    Ext.Msg.alert("提示", "方法调用失败");
                }
            });
        }

        //待发染色库转入半成品
        var InHalfProductStock = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '调到半成品库',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        batchParams.push(records[i].get("SerialNo"));
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }

                function call() {
                    var data = { objIds: batchParams, progId: progId, personName: personName, personId: personId, buttonId: "WaitDyeStock" };
                    Ext.Ajax.request({
                        url: 'api/WaitDyeStock/AddHalfWaitDyeStockOut',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", "处理成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //染色布发出
        var DyedClothEmits = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '染色布发出',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        batchParams.push(records[i].get("SerialNo"));
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }

                function call() {
                    Ax.utils.LibVclSystemUtils.openBill('stk.HalfDyeStockOut', BillTypeEnum.Bill, '染色布/印花布发布', BillActionEnum.AddNew, undefined, undefined, {
                        progObj: this,
                        serialNoList: batchParams,
                        callbackFunc: function (obj) {
                        }
                    });
                }
            }
        });

        //#region 导入花型工艺信息

        //导入花型工艺信息

        var btnImportFlowerCraftFromXls = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '花型信息导入',
            handler: function () {
                fnImportFlowerCraftFromXls();
            }
        });

        function fnImportFlowerCraftFromXls() {
            fpFileUploadControlExt(this, 1, "FlowerCraftXls", function (obj, fileName) {
                var data = { ExcelPath: fileName };
                Ext.Ajax.request({
                    url: 'api/ComFlowerCraft/ImportExcelComFlowerCraftInfo',
                    jsonData: data,
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (!result.Success) {
                            Ext.Msg.alert("提示", result.Message);
                        }
                        else {
                            Ext.Msg.alert("提示", "导入成功！");
                            //getBillListing();
                        }
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            });
        }

        //#endregion

        //#region 经纱纬纱导入


        var btnWarpWeftColorImport = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '经纬纱导入',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    //Ext.Msg.alert("提示", "请选择记录才能进行导入");
                    FnImportWarpWeftColorFromXls([]);
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一条记录进行导入操作!");
                }
                else {

                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("FLOWERCRAFTID");
                        if (FLOWERCRAFTID) {
                            flowerCraftIds.push(FLOWERCRAFTID);
                        }
                    }
                    var data = { FlowerCraftIds: flowerCraftIds };

                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/JudyIsExistsWarpWeftColor',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                if (result.Message.indexOf("花型编号") != -1) {


                                    //#region 导入前提示

                                    Ext.Msg.confirm("系统提示", result.Message + ",是否重新导入?",
                                        function (btn) {
                                            if (btn == "yes") {
                                                FnImportWarpWeftColorFromXls(flowerCraftIds);
                                            }
                                            else {

                                            }
                                        });
                                    //#endregion


                                } else {
                                    Ext.Msg.alert("提示", result.Message);
                                }

                            }
                            else {

                                FnImportWarpWeftColorFromXls(flowerCraftIds);

                                //Ext.Msg.alert("提示", "导入成功！");
                                getBillListing();
                            }

                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });

        //导入WarpColorXmls
        var fnImportWarpWeftColorFromXlsInner = function (flowerCraftIds, fileName) {
            var data = { FlowerCraftIds: flowerCraftIds, ExcelPath: fileName };
            Ext.Ajax.request({
                url: 'api/ComFlowerCraft/ImportWarpWeftColorFromXls',
                jsonData: data,
                method: 'POST',
                async: false,
                timeout: 90000000,
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (!result.Success) {
                        Ext.Msg.alert("提示", result.Message);
                    }
                    else {

                        //#region 判断是否已经存在生成的产品经纬纱

                        var flowerCraftIds = [result.Result];
                        flowerCraftIds.push();
                        var params = { FlowerCraftIds: flowerCraftIds };
                        Ext.Ajax.request({
                            url: 'api/DsProduct/IsExistsFlowerWarpAndWeftOfProduct',
                            jsonData: params,
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                }
                                else {

                                    if (result.Success) {

                                        if (result.Result === "1") {


                                            Ext.Msg.alert("提示", "该花型工艺已生成过产品工艺,请核对序号及米用量后确认是否手动生成产品工艺!");

                                            ////#region 是否要导入     花型已存在生成的产品工艺,是否要覆盖？
                                            //Ext.Msg.confirm("系统提示", "该花型工艺已生成过产品工艺,请核对序号及米用量后确认是否手动生成产品工艺!",
                                            //    function (btn) {
                                            //        if (btn == "yes") {
                                            //            var data = { FlowerCraftIds: flowerCraftIds, IsReOver: true };
                                            //            Ext.Ajax.request({
                                            //                url: 'api/ComFlowerCraft/GenerateProduct',
                                            //                jsonData: data,
                                            //                method: 'POST',
                                            //                async: false,
                                            //                timeout: 90000000,
                                            //                success: function (response) {
                                            //                    var result = Ext.decode(response.responseText);
                                            //                    if (!result.Success) {
                                            //                        Ext.Msg.alert("提示", result.Message);
                                            //                    }
                                            //                    else {

                                            //                        getBillListing();
                                            //                        Ext.Msg.alert("提示", "覆盖成功！");
                                            //                    }

                                            //                },
                                            //                failure: function (response) {
                                            //                    Ext.Msg.alert("提示", "方法调用失败");
                                            //                }
                                            //            });
                                            //        }
                                            //        else {

                                            //        }
                                            //    });
                                            ////#endregion

                                        } else {
                                            getBillListing();
                                            Ext.Msg.alert("提示", "导入成功！");
                                        }

                                    } else {
                                        Ext.Msg.alert("提示", result.Message);
                                    }

                                }

                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });

                        //#endregion



                        //Ext.Msg.alert("提示", "导入成功！");
                        //getBillListing();
                    }

                },
                failure: function (response) {
                    Ext.Msg.alert("提示", "方法调用失败");
                }
            });

        }


        //Excel导入经纬纱
        function FnImportWarpWeftColorFromXls(flowerCraftIds) {
            fpFileUploadControlExt(this, 1, "WarpWeftColorXls", function (obj, fileName) {

                var dataProduct = { FlowerCraftIds: flowerCraftIds, ExcelPath: fileName };
                Ext.Ajax.request({
                    url: 'api/ComFlowerCraft/JudyIsExistsProduct',
                    jsonData: dataProduct,
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (!result.Success) {
                            if (result.Message.indexOf("花型编号") != -1) {


                                //#region 导入前提示

                                Ext.Msg.confirm("系统提示", result.Message,
                                    function (btn) {
                                        if (btn == "yes") {
                                            fnImportWarpWeftColorFromXlsInner(flowerCraftIds, fileName);
                                        }
                                        else {

                                        }
                                    });
                                //#endregion


                            } else {
                                Ext.Msg.alert("提示", result.Message);
                            }

                        }
                        else {

                            fnImportWarpWeftColorFromXlsInner(flowerCraftIds, fileName);

                            //Ext.Msg.alert("提示", "导入成功！");
                            getBillListing();
                        }

                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });





            });
        }



        //#endregion

        //#region 经纬纱导出

        var btnWarpWeftColorExport = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '经纬纱导出',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行导入");
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一条记录进行导入操作!");
                }
                else {

                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("FLOWERCRAFTID");
                        if (FLOWERCRAFTID) {
                            flowerCraftIds.push(FLOWERCRAFTID);
                        }
                    }
                    var data = { FlowerCraftIds: flowerCraftIds };
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/ExportWarpWeftColorToXls',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                window.location.href = '/TempData/ExportData/FlowerCrafWarpWefts/' + result.Result;
                                Ext.Msg.alert("提示", "导出成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });

        //#endregion

        //#region 生成产品

        var btnGenerateProduct = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '生成产品',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行生成产品");
                } else {
                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("FLOWERCRAFTID");
                        if (FLOWERCRAFTID) {
                            flowerCraftIds.push(FLOWERCRAFTID);
                        }
                    }
                    Ext.Msg.confirm("系统提示",
                        "确定要生成产品吗？",
                        function (btn) {
                            if (btn == "yes") {
                                var data = { FlowerCraftIds: flowerCraftIds };
                                Ext.Ajax.request({
                                    url: 'api/ComFlowerCraft/GenerateProduct',
                                    jsonData: data,
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (!result.Success) {
                                            Ext.Msg.alert("提示", result.Message);
                                        }
                                        else {
                                            Ext.Msg.alert("提示", "生成成功！");
                                            getBillListing();
                                        }

                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                            else {

                            }
                        });
                }
            }
        });

        //#endregion
        var btnTBAfter = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '同步原料信息',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行同步");
                }
                //else if (records.length > 1) {
                //    Ext.Msg.alert("提示", "只能同时操作一条数据");
                //}
                else {
                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("MATERIALTYPEID");
                        if (FLOWERCRAFTID) {
                            flowerCraftIds.push(FLOWERCRAFTID);
                        }
                    }

                    var data = { FlowerCraftId: flowerCraftIds.join(',') };
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/TBAfter',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", "同步成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });

        var btnFS = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '复审',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行复审");
                }
                //else if (records.length > 1) {
                //    Ext.Msg.alert("提示", "只能同时操作一条数据");
                //}
                else {
                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("PRODUCTID");
                        var AUDITSTATE = records[i].get("AUDITSTATE");
                        var ISFS = records[i].get("ISFS");
                        if (AUDITSTATE != 2) {
                            Ext.Msg.alert("提示", "只有已审核状态下，才能点击复审");
                            return;
                        }
                        if (ISFS != 0) {
                            Ext.Msg.alert("提示", "只有未复审状态下，才能点击复审");
                            return;
                        }
                        if (FLOWERCRAFTID) {
                            flowerCraftIds.push(FLOWERCRAFTID);
                        }
                    }

                    var data = { FlowerCraftId: flowerCraftIds.join(',')};
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/TBAfter2',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", "反复审成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });

        var btnFSNot = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '反复审',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行复审");
                }
                //else if (records.length > 1) {
                //    Ext.Msg.alert("提示", "只能同时操作一条数据");
                //}
                else {
                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("PRODUCTID");
                        var AUDITSTATE = records[i].get("AUDITSTATE");
                        var ISFS = records[i].get("ISFS");
                        if (AUDITSTATE != 2) {
                            Ext.Msg.alert("提示", "只有已审核状态下，才能点击反复审");
                            return;
                        }
                        if (ISFS != 1) {
                            Ext.Msg.alert("提示", "只有已复审状态下，才能点击反复审");
                            return;
                        }
                        if (FLOWERCRAFTID) {
                            flowerCraftIds.push(FLOWERCRAFTID);
                        }
                    }

                    var data = { FlowerCraftId: flowerCraftIds.join(',') };
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/TBAfter4',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", "复审成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });


        var btnFSM = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '复审',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行复审");
                }
                //else if (records.length > 1) {
                //    Ext.Msg.alert("提示", "只能同时操作一条数据");
                //}
                else {
                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("BILLNO");
                        var ISFS = records[i].get("ISFS");
                        var CURRENTSTATE = records[i].get("CURRENTSTATE");
                        if (ISFS != 0) {
                            Ext.Msg.alert("提示", "只有未复审状态下，才能点击复审");
                            return;
                        }
                        if (CURRENTSTATE != 2) {
                            Ext.Msg.alert("提示", "只有生效状态下，才能点击复审");
                            return;
                        }
                        flowerCraftIds.push(FLOWERCRAFTID);
                    }

                    var data = { FlowerCraftId: flowerCraftIds.join(','), progId: progId  };
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/TBAfter3',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", "复审成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });

        var btnFSMNot = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '反复审',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行复审");
                }
                //else if (records.length > 1) {
                //    Ext.Msg.alert("提示", "只能同时操作一条数据");
                //}
                else {
                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("BILLNO");
                        var ISFS = records[i].get("ISFS");
                        if (ISFS != 1) {
                            Ext.Msg.alert("提示", "只有已复审状态下，才能点击反复审");
                            return;
                        }

                        flowerCraftIds.push(FLOWERCRAFTID);
                    }

                    var data = { FlowerCraftId: flowerCraftIds.join(','), progId: progId };
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/TBAfter5',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", "复审成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });



        //#region 导出产品工艺单
        var btnExportProductCraftBill = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '产品工艺单导出',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能进行生成产品");
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能同时操作一条数据");
                }
                else {
                    var flowerCraftIds = [];
                    for (var i = 0; i < records.length; i++) {
                        var FLOWERCRAFTID = records[i].get("FLOWERCRAFTID");
                        if (FLOWERCRAFTID) {
                            flowerCraftIds.push(FLOWERCRAFTID);
                        }
                    }

                    var data = { FlowerCraftId: flowerCraftIds[0] };
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/ExportProductCraftBill',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {

                                window.location.href = '/TempData/ExportData/ProductCrafts/' + result.Result;
                                Ext.Msg.alert("提示", "导出成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });

        //#endregion

        //#region 导入产品名称

        var btnImportProductInfo = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '导入产品名称',
            handler: function () {
                Ext.Msg.confirm("系统提示", "导入产品名称将覆盖现有的名称,确定要导入？",
                    function (btn) {
                        if (btn === "yes") {
                            fpFileUploadControlExt(this, 1, "ProductNameXls", function (obj, fileName) {
                                var data = { ExcelPath: fileName };
                                Ext.Ajax.request({
                                    url: 'api/DsProduct/ImportDsProductNameFromXls',
                                    jsonData: data,
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (!result.Success) {
                                            Ext.Msg.alert("提示", result.Message);
                                        }
                                        else {
                                            Ext.Msg.alert("提示", "导入成功！");
                                            getBillListing();
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            });
                        }
                        else {

                        }
                    });
            }
        });

        //#endregion

        //#region 导入产品工艺图片

        var btnImportProductCraftImageFn = Ext.create(
            Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-edit',
                text: '导入产品图样',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();

                    fpMuiFileUploadExt(1, "ProductCraftImages", "", "api/UploadFile/SaveProductImage", 1);
                    return;
                    //以下部分已舍弃
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能进行上传产品图样!");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条数据导入产品图样!");
                    }
                    else {
                        var productIds = [];
                        for (var i = 0; i < records.length; i++) {
                            var PRODUCTID = records[i].get("PRODUCTID");
                            if (PRODUCTID) {
                                productIds.push(PRODUCTID);
                            }
                        }

                        fpFileUploadControlExt(this, 1, "ProductCraftImages", function (obj, fileName) {
                            var data = { ExcelPath: fileName, ProductId: productIds[0] };
                            Ext.Ajax.request({
                                url: 'api/DsProduct/ImportProductCraftImage',
                                jsonData: data,
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (!result.Success) {
                                        Ext.Msg.alert("提示", result.Message);
                                    }
                                    else {
                                        Ext.Msg.alert("提示", "导入成功！");
                                        getBillListing();
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        });

                    }
                }
            }
        );

        //#endregion

        //#region 花型纹板上传功能

        var uploadFlowerWenBanFn = Ext.create(
            Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-edit',
                text: '上传纹板',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能上传纹板!");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条数据上传纹板!");
                    } else {
                        var flowerCraftId = records[0].get("FLOWERCRAFTID");
                        fpMuiFileUploadExt(1, "FlowerPatterns", flowerCraftId, "api/UploadFile/SaveFlowerPattern", 1, "api/UploadFile/WenBanValid");
                    }
                }
            }
        );


        //#region 查看纹板

        var showFlowerWenBanFn = Ext.create(
            Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-edit',
                text: '下载纹板',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能下载纹板!");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条数据下载纹板!");
                    } else {
                        var flowerCraftId = records[0].get("FLOWERCRAFTID");
                        var winFielUpload = new Ext.Window({
                            title: '查看文件',
                            width: document.body.clientWidth * 0.8,
                            height: document.body.clientHeight * 0.8,
                            layout: 'fit',
                            constrainHeader: true,
                            autoDestory: true,
                            modal: true,
                            closeAction: 'hide',
                            items: [new Ext.Panel({
                                resizeTabs: true,
                                autoScroll: false,
                                html: '<iframe id="showFileIframe" scrolling="hidden" frameborder="0" width="100%" height="100%" src="/showFile.html?referId=' + flowerCraftId + '&saveDirName=FlowerPatterns&r=' + new Date().getMilliseconds() + '"></iframe>'
                            })],
                        });
                        winFielUpload.show();

                    }
                }
            }
        );


        //#endregion 


        //#region 多文件上传删除

        //删除文件
        window.deleteFileParent = function (referId, saveDirName, pathValue, callback) {
            var confirmOk = Ext.Msg.confirm('提示', "确定要删除吗?", function (button) {
                if (button === "yes") {
                    //花型纹板删除
                    if (saveDirName === "FlowerPatterns") {
                        var data = { FLOWERCRAFTID: referId, WENBFILEPATH: pathValue };
                        Ext.Ajax.request({
                            url: 'api/ComFlowerCraft/RemoveWenBanFile',
                            jsonData: data,
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                //return result.Entities;
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                }
                                else {
                                    Ext.Msg.alert("提示", "删除成功！");
                                    //getBillListing();
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                    callback.call(this);
                } else if (button === "no") {

                }
            });


        }

        //#endregion

        //#region 生成产品属性
        var btnGenerateAttr = Ext.create(
            Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-edit',
                text: '生成产品属性',
                handler: function () {
                    //Ext.Msg.confirm("系统提示", "确定要添加产品属性吗？", function (btn) {
                    //    if (btn === "yes") {

                    //    }
                    //});

                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能进行添加产品属性");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录添加产品属性");
                    }
                    else {
                        var productIds = [];
                        for (var i = 0; i < records.length; i++) {
                            var PRODUCTID = records[i].get("PRODUCTID");
                            if (PRODUCTID) {
                                productIds.push(PRODUCTID);
                            }
                        }
                        Ax.utils.LibVclSystemUtils.openDataFunc("ds.ProductAddAttrFunc", "添加产品属性", [this, productIds]);

                    }
                }
            }
        );
        //#endregion


        //#region 花型附加属性导入

        var btnFlowerAttrImport = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '附加属性导入',
            handler: function () {

                fpFileUploadControlExt(this, 1, "FlowerAttrXls", function (obj, fileName) {
                    var data = { ExcelPath: fileName };
                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/ImportFlowerAttrFromXls',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", "导入成功！");
                                getBillListing();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                });

            }
        });

        //#endregion

        //#region 生成产品生成产工艺

        var btnGenerateProdCraf = Ext.create(Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-edit',
                text: '添加生产工艺',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能进行添加生产工艺");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录添加生产工艺");
                    }
                    else {
                        var productIds = [];
                        for (var i = 0; i < records.length; i++) {
                            var PRODUCTID = records[i].get("PRODUCTID");
                            if (PRODUCTID) {
                                productIds.push(PRODUCTID);
                            }
                        }
                        Ax.utils.LibVclSystemUtils.openDataFunc("ds.ProductAddCrafFunc", "添加产品生产工艺", [this, productIds]);

                    }
                }
            });


        //#endregion

        //#region 整经落实计算原料 todo:sync_other

        var btnCalcWarpMaterialFn = Ext.create(Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-edit',
                text: '计算领料',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能计算领料");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录计算领料");
                    }
                    else {
                        var WarpNos = [];
                        for (var i = 0; i < records.length; i++) {
                            var WarpNo = records[i].get("BILLNO");
                            if (WarpNo) {
                                WarpNos.push(WarpNo);
                            }
                        }

                        //#region 请求接口开始计算领料

                        Ext.Msg.confirm("系统提示",
                            "确定重新计算领料吗？",
                            function (btn) {
                                if (btn === "yes") {
                                    var data = { WarpNos: WarpNos };
                                    Ext.Ajax.request({
                                        url: 'api/production/CalcWarpMaterial',
                                        jsonData: data,
                                        method: 'POST',
                                        async: false,
                                        timeout: 90000000,
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText);
                                            if (!result.Success) {
                                                Ext.Msg.alert("提示", result.Message);
                                            }
                                            else {
                                                Ext.Msg.alert("提示", "重新计算领料成功！");
                                                getBillListing();
                                            }

                                        },
                                        failure: function (response) {
                                            Ext.Msg.alert("提示", "方法调用失败");
                                        }
                                    });
                                }
                                else {

                                }
                            });

                        //#endregion

                    }
                }
            });

        //#endregion

        //#region 织造落实计算领料 todo:sync_other

        var btnCalcWeftMaterialFn = Ext.create(Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-edit',
                text: '计算领料',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能计算领料");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录计算领料");
                    }
                    else {
                        var BILLIDs = [];
                        for (var i = 0; i < records.length; i++) {
                            var BILLID = records[i].get("BILLID");
                            if (BILLID) {
                                BILLIDs.push(BILLID);
                            }
                        }

                        //#region 请求接口开始计算领料

                        Ext.Msg.confirm("系统提示",
                            "确定重新计算领料吗？",
                            function (btn) {
                                if (btn === "yes") {
                                    var data = { WeaVBillIds: BILLIDs };
                                    Ext.Ajax.request({
                                        url: 'api/production/CalcWeftMaterial',
                                        jsonData: data,
                                        method: 'POST',
                                        async: false,
                                        timeout: 90000000,
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText);
                                            if (!result.Success) {
                                                Ext.Msg.alert("提示", result.Message);
                                            }
                                            else {
                                                Ext.Msg.alert("提示", "重新计算领料成功！");
                                                getBillListing();
                                            }

                                        },
                                        failure: function (response) {
                                            Ext.Msg.alert("提示", "方法调用失败");
                                        }
                                    });
                                }
                                else {

                                }
                            });

                        //#endregion

                    }
                }
            });

        //#endregion


        //#endregion todo:vic

        //#region 后整理打印流转卡

        var btnPrintAfterWayTranCard = Ext.create(Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-print',
                text: '打印流转卡',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能进行打印流转卡");
                    }
                    //else if (records.length > 1) {
                    //    Ext.Msg.alert("提示", "只能选择一条记录添加生产工艺");
                    //}
                    else {
                        var serialNos = [];
                        debugger;
                        var serialNoGetParam = "";
                        for (var i = 0; i < records.length; i++) {
                            var SERIALNO = records[i].get("SERIALNO");
                            if (SERIALNO) {
                                serialNos.push(SERIALNO);
                                serialNoGetParam += SERIALNO + "_";
                            }
                        }

                        var that = this;
                        Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                            if (btn == "yes") {

                                var param = { SerialNos: serialNos, IsOnlyBody: true };
                                //var _serialNoGetParam = encodeURIComponent(serialNoGetParam);
                                //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                //var hostUrl = window.location.host;
                                //var getPrintUrl = "URL:http://" + hostUrl + "/Template/Html/Print/PrintAfterWayTurnCard.aspx?serialNosString=" + _serialNoGetParam;
                                //LODOP.ADD_PRINT_HTM(35, 5, "100%", "100%", getPrintUrl);
                                //LODOP.SET_PRINT_STYLE("FontSize", 10);
                                ////LODOP.SET_PRINT_STYLEA(1, "FontSize", 9);
                                ////LODOP.SET_PRINT_STYLEA(2, "FontSize", 9);
                                ////LODOP.ADD_PRINT_BARCODE(3, 10, 105, 105, "QRCode", 1);
                                ////LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 4);
                                ////LODOP.SET_PRINT_PAGESIZE(1, 890, 1130); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小
                                //LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
                                ////LODOP.ADD_PRINT_TEXT(226, 2, 276, 112, "@StorageID");
                                //LODOP.PREVIEW();

                                ////window.document.body.innerHTML = printhtml;
                                ////window.print();

                                ////LODOP.PRINT();


                                call.apply(this);
                                function call() {
                                    Ext.Ajax.request({
                                        url: '/api/afterwaymanagement/PrintPlsAfterBookToHtml',
                                        jsonData: param,
                                        method: 'POST',
                                        async: false,
                                        timeout: 90000000,
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText);
                                            if (!result.Success) {
                                                Ext.Msg.alert("提示", result.Message);
                                            } else {

                                                //#region 打印

                                                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));


                                                LODOP.ADD_PRINT_HTM(5, 5, "100%", "100%", result.Result);

                                                LODOP.SET_PRINT_STYLE("FontSize", 10);
                                                //LODOP.SET_PRINT_STYLEA(1, "FontSize", 9);
                                                //LODOP.SET_PRINT_STYLEA(2, "FontSize", 9);
                                                //LODOP.ADD_PRINT_BARCODE(3, 10, 105, 105, "QRCode", 1);
                                                //LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 4);
                                                //LODOP.SET_PRINT_PAGESIZE(1, 890, 1130); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小

                                                LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
                                                //LODOP.ADD_PRINT_TEXT(226, 2, 276, 112, "@StorageID");
                                                LODOP.PREVIEW();


                                                //window.print();

                                                //LODOP.PRINT();

                                                //#endregion

                                                if (result.Message != null) {
                                                    Ext.Msg.alert("提示", result.Message);
                                                    //getBillListing();
                                                }
                                            }


                                        },
                                        failure: function (response) {
                                            Ext.Msg.alert("提示", "方法调用失败");
                                        }
                                    });
                                }
                            }
                        });


                        //Ax.utils.LibVclSystemUtils.openDataFunc("ds.ProductAddCrafFunc", "添加产品生产工艺", [this, productIds]);

                    }
                }
            }
        );

        var btnPrintAfterBindWayTranCard = Ext.create(Ext.Action,
            {
                xtype: 'splitbutton',
                iconCls: 'fa fa-print',
                text: '打印流转卡',
                handler: function () {
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择记录才能进行打印流转卡");
                    }
                    else if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录打印流转卡");
                    }
                    else {
                        var billNos = [];

                        for (var i = 0; i < records.length; i++) {
                            var BILLNO = records[i].get("BILLNO");
                            if (BILLNO) {
                                billNos.push(BILLNO);
                            }
                        }

                        var that = this;
                        Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                            if (btn == "yes") {

                                var param = { BILLNOS: billNos };
                                //var _serialNoGetParam = encodeURIComponent(serialNoGetParam);
                                //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                                //var hostUrl = window.location.host;
                                //var getPrintUrl = "URL:http://" + hostUrl + "/Template/Html/Print/PrintAfterWayTurnCard.aspx?serialNosString=" + _serialNoGetParam;
                                //LODOP.ADD_PRINT_HTM(35, 5, "100%", "100%", getPrintUrl);
                                //LODOP.SET_PRINT_STYLE("FontSize", 10);
                                ////LODOP.SET_PRINT_STYLEA(1, "FontSize", 9);
                                ////LODOP.SET_PRINT_STYLEA(2, "FontSize", 9);
                                ////LODOP.ADD_PRINT_BARCODE(3, 10, 105, 105, "QRCode", 1);
                                ////LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 4);
                                ////LODOP.SET_PRINT_PAGESIZE(1, 890, 1130); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小
                                //LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
                                ////LODOP.ADD_PRINT_TEXT(226, 2, 276, 112, "@StorageID");
                                //LODOP.PREVIEW();

                                ////window.document.body.innerHTML = printhtml;
                                ////window.print();

                                ////LODOP.PRINT();


                                call.apply(this);
                                function call() {
                                    Ext.Ajax.request({
                                        url: '/api/afterwaymanagement/PrintPlsBindAfterBookToHtml',
                                        jsonData: param,
                                        method: 'POST',
                                        async: false,
                                        timeout: 90000000,
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText);
                                            if (!result.Success) {
                                                Ext.Msg.alert("提示", result.Message);
                                            } else {

                                                //#region 打印

                                                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));


                                                LODOP.ADD_PRINT_HTM(5, 5, "100%", "100%", result.Result);

                                                LODOP.SET_PRINT_STYLE("FontSize", 10);
                                                //LODOP.SET_PRINT_STYLEA(1, "FontSize", 9);
                                                //LODOP.SET_PRINT_STYLEA(2, "FontSize", 9);
                                                //LODOP.ADD_PRINT_BARCODE(3, 10, 105, 105, "QRCode", 1);
                                                //LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 4);
                                                //LODOP.SET_PRINT_PAGESIZE(1, 890, 1130); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小

                                                LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
                                                //LODOP.ADD_PRINT_TEXT(226, 2, 276, 112, "@StorageID");
                                                LODOP.PREVIEW();


                                                //window.print();

                                                //LODOP.PRINT();

                                                //#endregion

                                                if (result.Message != null) {
                                                    Ext.Msg.alert("提示", result.Message);
                                                    //getBillListing();
                                                }
                                            }


                                        },
                                        failure: function (response) {
                                            Ext.Msg.alert("提示", "方法调用失败");
                                        }
                                    });
                                }
                            }
                        });


                        //Ax.utils.LibVclSystemUtils.openDataFunc("ds.ProductAddCrafFunc", "添加产品生产工艺", [this, productIds]);

                    }
                }
            }
        );

        //#endregion

        //#region 五金仓库 todo:vic

        //五金入库单导出
        var btnExportEmInboundOrderBill = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '打印',
            handler: function () {



                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "选择一条记录才能导出入库单");
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能同时操作一条数据");
                }
                else {





                    Ext.Msg.confirm("系统提示", "确定要打印吗?",
                        function (btn) {
                            if (btn == "yes") {

                                var InBoundOrderNos = [];
                                for (var i = 0; i < records.length; i++) {
                                    var InBoundOrderNo = records[i].get("InBoundOrderNo");
                                    if (InBoundOrderNo) {
                                        InBoundOrderNos.push(InBoundOrderNo);
                                    }
                                }

                                var data = { InBoundOrderNo: InBoundOrderNos[0] };





                                Ext.Ajax.request({
                                    url: 'api/EmInboundOrder/ExportEmInboundOrderBill',
                                    jsonData: data,
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (!result.Success) {
                                            Ext.Msg.alert("提示", result.Message);
                                        }
                                        else {
                                            window.location.href = '/TempData/ExportData/HardWare/' + result.Result;
                                            //Ext.Msg.alert("提示", "导出成功！");
                                            //getBillListing();
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });



                            }
                            else {

                            }
                        });





                }







            }
        });


        //五金出库单导出
        var btnExportEmOutboundOrderBill = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '打印',
            handler: function () {


                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "选择一条记录才能导出出库单");
                }
                else if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能同时操作一条数据");
                }
                else {



                    Ext.Msg.confirm("系统提示", "确定要打印吗?",
                        function (btn) {
                            if (btn == "yes") {

                                var OutBoundOrderNos = [];
                                for (var i = 0; i < records.length; i++) {
                                    var OutBoundOrderNo = records[i].get("OutBoundOrderNo");
                                    if (OutBoundOrderNo) {
                                        OutBoundOrderNos.push(OutBoundOrderNo);
                                    }
                                }
                                var data = { OutBoundOrderNo: OutBoundOrderNos[0] };
                                Ext.Ajax.request({
                                    url: 'api/EmOutboundOrder/ExportEmOutboundOrderBill',
                                    jsonData: data,
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (!result.Success) {
                                            Ext.Msg.alert("提示", result.Message);
                                        }
                                        else {
                                            window.location.href = '/TempData/ExportData/HardWare/' + result.Result;
                                            //Ext.Msg.alert("提示", "导出成功！");
                                            //getBillListing();
                                        }
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });

                            }
                            else {

                            }
                        });





                }






            }
        });


        //#endregion

        //#region 经轴库存明细作废
        var btnCancelWarpDetailStk = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '库存作废',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择记录才能库存作废");
                } else {
                    var BILLNOS = [];
                    for (var i = 0; i < records.length; i++) {
                        var BILLNO = records[i].get("BILLNO");
                        if (BILLNO) {
                            BILLNOS.push(BILLNO);
                        }
                    }
                    Ext.Msg.confirm("系统提示",
                        "确定要作废所选记录吗？",
                        function (btn) {
                            if (btn == "yes") {
                                var data = { BILLNOS: BILLNOS };
                                Ext.Ajax.request({
                                    url: 'api/StkWarpBeamDetail/CancelWarpDetailStk',
                                    jsonData: data,
                                    method: 'POST',
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var result = Ext.decode(response.responseText);
                                        if (!result.Success) {
                                            Ext.Msg.alert("提示", result.Message);
                                        }
                                        else {
                                            Ext.Msg.alert("提示", "库存作废成功！");
                                            getBillListing();
                                        }

                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert("提示", "方法调用失败");
                                    }
                                });
                            }
                            else {

                            }
                        });
                }
            }
        });

        //#endregion

        //#region 销售订单调拨审核\反审核
        //销售订单调拨审核
        //通过销售订单调拨待审核
        var passSaleOrderAllocation = Ext.create(Ext.Action, {
            text: '审核通过',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("SheetId");
                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/saleorder/PassAuditSaleOrderAllocation',
                        jsonData: { progId: progId, SheetIdList: batchParams, personId: personId, buttonId: "passSaleOrderAllocation" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //不通过销售订单调拨待审核
        var notPassSaleOrderAllocation = Ext.create(Ext.Action, {
            text: '审核不通过',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("SheetId");
                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/saleorder/NotPassAuditSaleOrderAllocation',
                        jsonData: { progId: progId, SheetIdList: batchParams, personId: personId, buttonId: "passSaleOrderAllocation" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //#endregion

        //#region 导出验货单
        var exportCheckClothApply = Ext.create(Ext.Action, {
            text: '导出验货单',
            //iconCls: 'fa fa-download',
            /*            hidden: contains(permissionList, 6666, false, 'printPurOrder', defineItems),*/
            handler: function () {
                var sheetId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    sheetId = records[0].get("SheetId");
                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: '/api/StkCheckClothApply/ExportCheckClothApply',
                            jsonData: { personId: Ext.util.Cookies.get("loginPersonId"), progId: progId, paramValue: sheetId, buttonId: "exportCheckClothApply" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Message != null) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result.Enttity;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/CheckClothApply/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
                else if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                else { Ext.Msg.alert("提示", "只能选择一条"); }
            }
        });
        //#endregion

        //#region 设置后整理结束
        //设置后整理结束
        var EndAfterWay = Ext.create(Ext.Action, {
            text: '设置后整理结束',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/halfproductmanagement/EndAfterWay',
                        jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "EndAfterWay" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //#endregion

        //设备导出二维码 Begin
        var importEquipmentQRCode4 = Ext.create(Ext.Action, {
            text: '打印成品检验发出单',
            iconCls: 'fa fa-print',
            handler: function () {
                Ext.Msg.confirm("系统提示", "确定要导出吗？", function (btn) {
                    if (btn == "yes") {
                        var batchParams = [];
                        var records = gridPanel.getView().getSelectionModel().getSelection();
                        if (records.length > 0) {
                            var pk = [];
                            for (var i = 0; i < records.length; i++) {
                                var pkStr = gridPanel.Pks[0];
                                var value = records[i].get(pkStr);
                                pk.push(value);
                            }
                            batchParams.push(pk);
                            call.apply(this);
                        }
                        if (records.length == 0) {
                            Ext.Msg.alert("提示", "未选择数据");
                        }
                        if (records.length == 0) {
                            Ext.Msg.alert("提示", "只能选择一条数据打印");
                        }
                        function call() {
                            Ext.Ajax.request({
                                url: '/api/equipment/importEquipmentQRCode4',
                                jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Success == false) {
                                        Ext.Msg.alert("提示", result.Message);
                                    }
                                    else {
                                        var fileName = result.Enttity;
                                        window.location.href = '/TempData/ExportData/' + fileName;
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    }
                });
            }
        });
        //设备导出二维码 End

        //设备导出二维码 Begin
        var importEquipmentQRCode5 = Ext.create(Ext.Action, {
            text: '打印PCTG标签码单',
            iconCls: 'fa fa-print',
            handler: function () {
                Ext.Msg.confirm("系统提示", "确定要导出吗？", function (btn) {
                    if (btn == "yes") {
                        var batchParams = [];
                        var records = gridPanel.getView().getSelectionModel().getSelection();
                        if (records.length > 0) {
                            var pk = [];
                            for (var i = 0; i < records.length; i++) {
                                var pkStr = gridPanel.Pks[0];
                                var value = records[i].get(pkStr);
                                pk.push(value);
                            }
                            batchParams.push(pk);
                            call.apply(this);
                        }
                        if (records.length == 0) {
                            Ext.Msg.alert("提示", "未选择数据");
                        }
                        function call() {
                            Ext.Ajax.request({
                                url: '/api/equipment/importEquipmentQRCode5',
                                jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Success == false) {
                                        Ext.Msg.alert("提示", result.Message);
                                    }
                                    else {
                                        var fileName = result.Enttity;
                                        window.location.href = '/TempData/ExportData/' + fileName;
                                    }
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    }
                });
            }
        });
        //设备导出二维码 End

        //#region 设置后整理未结束
        //设置后整理结束
        var UnEndAfterWay = Ext.create(Ext.Action, {
            text: '取消后整理结束',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");

                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/halfproductmanagement/UnEndAfterWay',
                        jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "UnEndAfterWay" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //#endregion

        //#region 半成品库存-品质状态转换


        var qcTranState = Ext.create(Ext.Action, {
            text: '状态转回修',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {

                        if (records[i].get("BCPSTATE") != 0) {
                            Ext.Msg.alert("提示", "状态是等待的情况下才允许操作改按钮");
                            return false;
                        }
                        else {
                            var value = records[i].get("BARCODE");
                            batchParams.push(value);
                        }
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Msg.confirm("系统提示", "您确定要进行状态转回修吗？", function (btn) {
                        if (btn == "yes") {
                            Ext.Ajax.request({
                                url: 'api/halfproductmanagement/TurnQporwaster2',
                                jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "qcTranState" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    });
                }
            }
        });

        var qcTranQuality = Ext.create(Ext.Action, {
            text: '品质状态转换',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Msg.confirm("系统提示", "您确定要进行品质状态转换吗？", function (btn) {
                        if (btn == "yes") {
                            Ext.Ajax.request({
                                url: 'api/halfproductmanagement/TurnQporwaster',
                                jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "qcTranQuality" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    });
                }
            }
        });

        var qcTranQuality3 = Ext.create(Ext.Action, {
            text: '品质状态转换',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("SerialNo");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Msg.confirm("系统提示", "您确定要进行品质状态转换吗？", function (btn) {
                        if (btn == "yes") {
                            Ext.Ajax.request({
                                url: 'api/halfproductmanagement/TurnQporwaster3',
                                jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "qcTranQuality3" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    });
                }
            }
        });
        //#endregion

        //#region 转移至后整理

        var turnToPlsAfterWay = Ext.create(Ext.Action, {
            text: '转移至后整理',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");
                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Msg.confirm("系统提示", "您确定要进行转移至后整理吗？", function (btn) {
                        if (btn == "yes") {
                            Ext.Ajax.request({
                                url: 'api/halfproductmanagement/TurnToPlsAfterWay',
                                jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "TurnToPlsAfterWay" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.Success) {
                                        Ext.Msg.alert("提示", "操作成功!");
                                        getBillListing();
                                    } else {
                                        Ext.Msg.alert("提示", result.Message);
                                    }


                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }
                    });
                }
            }
        });

        //#endregion

        //#region 结束流水号
        //结束流水号
        var EndSerialNo = Ext.create(Ext.Action, {
            text: '结束流水号',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");

                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {

                    Ext.Msg.confirm("系统提示", "确认是否结束？", function (btn) {
                        if (btn == "yes") {

                            Ext.Ajax.request({
                                url: 'api/halfproductmanagement/EndSerialNo',
                                jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "EndSerialNo" },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                },
                                failure: function (response) {
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });

                        }
                    });
                }
            }
        });
        //#endregion

        //#region 导出色织布明细
        var ExportStkHalfWeavStockOutExcel = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '导出色织布明细',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择单据");
                }
                else {
                    var Ids = [];
                    var personId = Ext.util.Cookies.get("loginPersonId");
                    for (var i = 0; i < records.length; i++) {
                        Ids.push(records[i].get("BILLNO"));
                    }
                    var data = { progId: progId, paramValue: Ids, personId: personId, buttonId: "ExportStkHalfWeavStockOutExcel" };
                    Ext.Ajax.request({
                        url: 'api/StkHalfWeavStockOut/ExportStkHalfWeavStockOutExcel',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/WeavStockOut/ExportStkHalfWeavStockOutExcel/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });
        //#endregion

        //#region 导出色织布明细
        var ExportStkHalfWeavStockInExcel = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '导出色织布明细',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择单据");
                }
                else {
                    var Ids = [];
                    var personId = Ext.util.Cookies.get("loginPersonId");
                    for (var i = 0; i < records.length; i++) {
                        Ids.push(records[i].get("BILLNO"));
                    }
                    var data = { progId: progId, paramValue: Ids, personId: personId, buttonId: "ExportStkHalfWeavStockInExcel" };
                    Ext.Ajax.request({
                        url: 'api/StkHalfWeavStockIn/ExportStkHalfWeavStockInExcel',
                        jsonData: data,
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/WeavStockIn/ExportStkHalfWeavStockInExcel/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });

                }
            }
        });

        //#endregion

        //#region 设置计算工资
        var SetSalary = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '是否计算工资',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择单据");
                }
                else {

                    Ext.MessageBox.show({
                        title: "提示",
                        msg: "需要计算工资吗？",
                        width: 300,
                        buttons: Ext.MessageBox.YESNOCANCEL,
                        multiline: false,
                        fn: setSalaryFunc,
                        animateTarget: "btn1",
                        icon: Ext.MessageBox.INFO
                    });
                    Ext.MessageBox.msgButtons[1].setText("计算工资");
                    Ext.MessageBox.msgButtons[2].setText("不计算工资");
                }
            }
        });
        function setSalaryFunc(btnId, text) {
            var records = gridPanel.getView().getSelectionModel().getSelection();

            var Ids = [];
            var personId = Ext.util.Cookies.get("loginPersonId");
            for (var i = 0; i < records.length; i++) {
                Ids.push(records[i].get("SheetId"));
            }
            var SalaryType = 0;
            if (btnId == "yes") {
                SalaryType = 1;
            }
            else if (btnId == "no") {
                SalaryType = 2;
            }
            if (SalaryType != 0) {
                var data = { progId: progId, paramValue: Ids, personId: personId, buttonId: "SetSalary", salaryType: SalaryType };

                Ext.Ajax.request({
                    url: 'api/halfproductmanagement/SetSalaryType',
                    jsonData: data,
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (!result.Success) {
                            Ext.Msg.alert("提示", result.Message);
                        }
                        else {
                            getBillListing();
                            Ext.Msg.alert("提示", "设置成功！");
                        }
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        }
        //#endregion    

        //#region 批量上传销售订单
        /****
         * 批量上传销售订单
         * */
        var saleOrderUpload = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '批量上传',
            handler: function () {
                var obj = "saleOrder";
                fpFileUploadControl(obj, 1, "saleOrder", function (obj, fileName) {
                    Ext.Ajax.request({
                        url: 'api/saleorder/GetUpLoadProduct',
                        jsonData: { paramValue: fileName, personId: Ext.util.Cookies.get("loginPersonId") },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                                return 0;
                            }
                            else {
                                getBillListing();
                                Ext.Msg.alert("提示", "批量上传成功！");
                                return 1;
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                            return 0;
                        }
                    });
                });
            }
        });
        //#endregion

        //#region 批量上传客户产品价格
        /****
         * 批量上传客户产品价格
         * */
        var CustomerProductUpload = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '批量上传',
            handler: function () {
                var obj = "comCustomerProduct";
                fpFileUploadControl(obj, 1, "comCustomerProduct", function (obj, fileName) {
                    Ext.Ajax.request({
                        url: 'api/Customer/UpLaodCustomerProductPrice',
                        jsonData: { paramValue: fileName, personId: Ext.util.Cookies.get("loginPersonId") },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                                return 0;
                            }
                            else {
                                getBillListing();
                                Ext.Msg.alert("提示", "批量上传成功！");
                                return 1;
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                            return 0;
                        }
                    });
                });
            }
        });
        //#endregion

        //#region 变更生效
        /**
         * 变更生效
         * */
        var OrderChangeEffect = Ext.create(Ext.Action, {
            text: '变更生效',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BILLNO");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/common/OrderChangeEffect',
                        jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "EndAfterWay" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            if (result.Success) {
                                getBillListing();
                                Ext.Msg.alert("提示", "操作成功!");
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //#endregion

        //#region 批量修改剪样布
        /****
         * 批量修改剪样布
         * */
        var upLoadSamplecloth = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '批量修改剪样布',
            handler: function () {
                var obj = "saleOrder";
                fpFileUploadControl(obj, 1, "saleOrder", function (obj, fileName) {
                    Ext.Ajax.request({
                        url: 'api/saleorder/GetUpLoadSamplecloth',
                        jsonData: { paramValue: fileName, personId: Ext.util.Cookies.get("loginPersonId") },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                                return 0;
                            }
                            else {
                                getBillListing();
                                Ext.Msg.alert("提示", "批量上传成功！");
                                return 1;
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                            return 0;
                        }
                    });
                });
            }
        });
        //#endregion

        //20210517 addbutton start
        //外购制单
        var createOutOrder = Ext.create(Ext.Action, {
            text: '制单',
            //iconCls: 'fa fa-file-excel-o',
            /*            hidden: contains(permissionList, 6666, false, 'createOrder', defineItems),*/
            handler: function () {
                var batchParams = [];
                var customer = "";
                var personId = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = [];
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);
                            pk.push(value);
                        }
                        batchParams.push(pk);
                        var value = records[i].get("SUPPLIERID");
                        if (records[i].get("SUPPLIERID")) {
                            if (customer == "") {
                                customer = records[i].get("SUPPLIERID");
                            }
                            else if (customer != records[i].get("SUPPLIERID")) {
                                Ext.Msg.alert("提示", "请选择相同供应商");
                                return;
                            }
                        }
                        else {
                            Ext.Msg.alert("提示", "供应商不能为空");
                            return;
                        }
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/supplierplatform/createoutorder',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams, personId: personId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });

        //#region 批量上传调拨
        /****
         * 批量上传调拨
         * */
        var BathFpAllocationApply = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '批量上传',
            handler: function () {
                var obj = "saleOrder";
                fpFileUploadControl(obj, 1, "saleOrder", function (obj, fileName) {
                    Ext.Ajax.request({
                        url: 'api/StkFpAllocationApply/BathFpAllocationApply',
                        jsonData: { excelPath: fileName, personId: Ext.util.Cookies.get("loginPersonId"), personName: Ext.util.Cookies.get("loginPersonName") },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                                return 0;
                            }
                            else {
                                getBillListing();
                                Ext.Msg.alert("提示", "批量上传成功！");
                                return 1;
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                            return 0;
                        }
                    });
                });
            }
        });
        //#endregion

        //#region 批量修改发货单信息
        /**
         * 批量修改发货单信息
         * */
        var BathEditGoodsTraffic = Ext.create(Ext.Action, {
            text: '批量修改',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("SHEETID");

                        batchParams.push(value);
                    }

                    BathGoodsTrafficFrom(batchParams, personId, personName, function () {
                        getBillListing();
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //#region 批量处理调拨单
        /**
         * 批量处理调拨单
         * */
        var ChangeFpAllocationApply = Ext.create(Ext.Action, {
            text: '主管确认',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("SheetId");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/StkFpAllocationApply/ProcessingStatus',
                        jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "ChangeFpAllocationApply" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            if (result.Success) {
                                getBillListing();
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //#endregion

        //#region 发货单查订单金额
        /**
         * 发货单查订单金额
         * */
        var SendOrderPrice = Ext.create(Ext.Action, {
            text: '订单金额',
            iconCls: 'fa fa-save',
            handler: function () {
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                Ext.Ajax.request({
                    url: 'api/common/verpermission',
                    jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "SendOrderPrice" },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (result.Success) {
                            var batchParams = [];

                            var records = gridPanel.getView().getSelectionModel().getSelection();
                            if (records.length > 0) {
                                if (records.length > 1) {
                                    Ext.Msg.alert("提示", "只能选择一条单据");
                                }
                                else {
                                    var SHEETID = "";
                                    for (var i = 0; i < records.length; i++) {
                                        var value = records[i].get("SHEETID");
                                        SHEETID = value;
                                    }
                                    var info = [];
                                    info.push({ GoodsTrafficId: SHEETID });
                                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OrderPriceFunc", "查看订单金额", [this, info]);
                                }


                            }
                            else {
                                Ext.Msg.alert("提示", "未选择数据");
                            }
                        }
                        else {
                            Ext.Msg.alert("提示", result.Message);
                        }
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        });
        //#endregion

        //#region 打印标签记录打码
        var printSaleOrderLabel = Ext.create(Ext.Action, {
            text: '打印标签',
            iconCls: 'fa fa-save',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var barCodeList = [];
                    var selBarCodeList = [];
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].get("CODESTATE") == 5 || records[i].get("CODESTATE") == "5") {
                            barCodeList.push(records[i].get("BARCODE"));
                        }
                        else {
                            var value = records[i].get("BARCODE");
                            //bigLabelPrint(value, 2, '');
                            selBarCodeList.push(value);
                        }
                    }

                    if (selBarCodeList.length > 0) {
                        SelectPrintAndPrintBarCode(selBarCodeList, 2);
                    }

                    if (barCodeList.length > 0) {
                        Ext.Msg.alert("提示", "失效状态不能打印标签");
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //#region 打印标签退货打码
        var printSaleOrderLabelProductReturn = Ext.create(Ext.Action, {
            text: '打印标签',
            iconCls: 'fa fa-save',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var selBarCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BarCode");
                        //bigLabelPrint(value, 2, '');
                        selBarCodeList.push(value);
                    }
                    if (selBarCodeList.length > 0) {
                        SelectPrintAndPrintBarCode(selBarCodeList, 2);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //#region 正常打码-记录打码
        var finishProductPrintCodeLabel = Ext.create(Ext.Action, {
            text: '打印标签',
            iconCls: 'fa fa-save',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var selBarCodeList = [];
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");
                        //bigLabelPrint(value, 2, '');
                        selBarCodeList.push(value);
                    }
                    if (selBarCodeList.length > 0) {
                        SelectPrintAndPrintBarCode(selBarCodeList, 2);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //#region 重新打码-记录打码
        var finishProductPrintReCodeLabel = Ext.create(Ext.Action, {
            text: '打印标签',
            iconCls: 'fa fa-save',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    selBarCodeList = [];
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("NEWBARCODE");
                        //bigLabelPrint(value, 2, '');
                        selBarCodeList.push(value);
                    }
                    if (selBarCodeList.length > 0) {
                        SelectPrintAndPrintBarCode(selBarCodeList, 2);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //查无单库存
        var SelectNoOrderNum = Ext.create(Ext.Action, {
            text: '查无单信息',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    //if (records.length > 1) {
                    //    Ext.Msg.alert("提示", "只能选择一条单据");
                    //}
                    /* else*/
                    {
                        var MATERIALIDs = "";
                        for (var i = 0; i < records.length; i++) {
                            var value = records[i].get("MATERIALID");
                            if (i < records.length - 1) {
                                MATERIALIDs = MATERIALIDs + value + " ";
                            }
                            else {
                                MATERIALIDs = MATERIALIDs + value;
                            }
                        }
                        var info = [];
                        info.push({ MATERIALIDs: MATERIALIDs });
                        Ax.utils.LibVclSystemUtils.openDataFunc("sp.MaterialStateFunc", "查无单信息", [this, info]);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //查台账
        var SelectAccountSub = Ext.create(Ext.Action, {
            text: '查台账',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条单据");
                    }
                    else {
                        var MATERIALID = "";
                        for (var i = 0; i < records.length; i++) {
                            var value = records[i].get("MATERIALID");
                            MATERIALID = value;
                        }
                        var info = [];
                        info.push({ MATERIALID: MATERIALID });
                        Ax.utils.LibVclSystemUtils.openDataFunc("stk.AccountSubFunc", "查台账", [this, info]);
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //查汇总 20250106标准版新增，所有单据有汇总报表的都有增加对应的汇总报表跳转功能，暂不添加任何关联条件。
        var SelectBillRpt = Ext.create(Ext.Action, {
            text: '查汇总',
            iconCls: 'fa fa-save',
            handler: function () {
                var info = [];
                //info.push({ NoticeId: batchParams });
                if (progId == "sal.SaleOrderJF") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sal.SaleOrderJFTotalRptFunc", "订单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "ds.Product") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("ds.ProMaterialConsumeTotalFunc", "产品原料消耗汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "sal.BackupOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sal.BackupOrderTotalFunc", "备库订单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.ReturnGoodsDealWith") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.FinishProductReturnFunc", "销售退货查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "sp.PurchaseOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sp.PurchaseOrderDetailRpt", "采购单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "sp.DyeOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sp.DyeOrderDetailRpt", "排色单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "sp.TwistOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sp.TwistOrderDetailRpt", "加捻/并线单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OutsourcingAccount") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OutAccountFunc", "委外库存查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OutsourcingStockReturn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OutStockReturnTotalFunc", "委外退料查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OtherMaterialStockIn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OtherMaterialStockInRpt", "其他入库单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OtherMaterialStockOut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OtherMaterialStockOutRpt", "其他出库单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.MoveStock") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.MoveStockTotalFunc", "移库管理查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.MaterialLoss") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.MaterialLossTotalFunc", "损益管理查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.MaterialTakeout") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.MaterialTakeoutDetailRpt", "外卖管理汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.ProductCut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.ProductCutTotalFunc", "开剪汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfAccountDetail") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfAccountDetailTotalFunc", "半成品库存汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.NoOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.FProductNoOrderTotalFunc", "成品转无单汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.FpAllocationApply") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.FpAllocationTotalFunc", "成品调拨汇总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "Em.TransferBoundOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("Em.TransferBoundOrderFunc", "设备移库单汇总", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "Em.EquipLossProfitOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("Em.EquipLossProfitOrderFunc", "五金物料损益单汇总", [this, info, function () { getBillListing(); }]);
                }
                else {
                    //Ax.utils.LibVclSystemUtils.openDataFunc("stk.CheckClothApplyPersonFunc", "选择处理人", [this, info, function () { getBillListing(); }]);
                }
            }
        });
        //查合计 20250109标准版新增，所有单据有合计报表的都有增加对应的合计报表跳转功能，暂不添加任何关联条件。
        var SelectBillTotalFunc = Ext.create(Ext.Action, {
            text: '查合计',
            iconCls: 'fa fa-save',
            handler: function () {
                var info = [];
                //info.push({ NoticeId: batchParams });
                if (progId == "com.BeamType") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("ds.WarpBeamTypeTotalFunc", "经轴类型合计查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "ds.Product") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("ds.ProductIDTotalFunc", "产品型号合计查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "sal.SaleOrderUpdateQuantityApply") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sal.SaleOrderUpdateQuantityTipFunc", "销售订单变更查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.GoodsTraffic") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.GoodsTrafficTotalFunc", "发货单合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "sp.MaterialSchedule") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sp.MaterialScheduleTotalFunc", "原料需求申请合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "pls.Outsourcing") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("pls.OutsourcingTotalFunc", "外购单合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.OutPurchaseReturn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.OutPurchaseReturnTotalFunc", "外购退货合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.AccountDetail") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.YuanLiaoKCHJCXRpt", "原料库存合计查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.PurMaterialStockIn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.PurMaterialStockInTotalFunc", "原材料采购合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "pls.PickMaterial") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("pls.PickMaterialTotalFunc", "原料领用合计查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OutsourcingStockOut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OutsourcingStockOutTotalFunc", "原料委外出库合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OutsourcingStockIn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OutsourcingStockInTotalFunc", "原料委外入库合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OutsourcingStockLoss") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OutsourcingStockLossTotalFunc", "委外损益合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.OutsourcingClaimant") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.OutsourcingClaimantTotalFunc", "委外索赔合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.TakeawayStockOut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.MaterialTakeoutTotalFunc", "原料外卖合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "pls.WarpWork") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("Pls.WarpWorkSummaryFunc", "整经报工合计查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "pls.WarpToWeav") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("pls.WarpWeavTotalFunc", "经轴卡任务书合计查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "pls.WeavWork") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("pls.WeavWorkTotalFunc", "织造报工合计总查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.HalfProduct") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.HalfProductTotalFunc", "半成品检验合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.HalfProductDefec") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.HalfProductDefectTotalFunc", "半成品检验疵点合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.OutWeaveProduct") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.OutWeaveProductTotalFunc", "外织造检验合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.OutWeave") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.OutWeaveTotalFunc", "外织造导入合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.FinishProduct") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.FinishProductTotalFunc", "半成品/成品检验合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.FinishProductDefect") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.FinishProductDefectFunc", "半成品/成品疵点合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.FinishProductRepair") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.FinishProductRepairFunc", "检验待处理合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.FinishProductStockDetail") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.FinishProductStockDetailTotalFunc", "成品检验后库存合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "qc.OutPurchase") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("qc.OutPurchaseTotalFunc", "外购检验合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.ProductReturnPrint") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.ProductReturnPrintTotalFunc", "退货打码合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "sal.SaleOrderLabel") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("sal.SaleOrderLabelTotalFunc", "打印标签记录合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfAccountDetail") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfProductStockTotalFunc", "半成品明细合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfWaitDyeStockDetail") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfWaitDyeStockDetailTotalFunc", "待发染色底部库存合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfAfterAccount") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfAfterAccountTotalFunc", "后处理厂库存合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfWeavStockOut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfWeavStockOutTotalFunc", "色织布发出合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfWeavStockIn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfWeavStockInTotalFunc", "色织布收回合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfDyeStockOut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfDyeStockOutTotalFunc", "染色布发出合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfDyeStockIn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfDyeStockInTotalFunc", "染色布收回合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfProductSendOut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfProductSendOutFunc", "半成品发出合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.Claimant") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.ClaimantFunc", "半成品索赔合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfAllocation") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfAllocationTotalFunc", "半成品调拨单合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.HalfProfitAndLoss") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.HalfProfitAndLossTotalFunc", "半成品库存损益合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.FinishProductStockDetail") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.StockTotalFunc", "成品库存合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.FinishProductStockIn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.StockInTotalFunc", "成品入库合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.ReturnWorkShop") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.ReturnWorkShopTotalFunc", "退回车间合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.FinishProductStockOut") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.StockOutTotalFunc", "成品出库合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.ProductReturnStockIn") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.ProductReturnStockInTotalFunc", "退货入库合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.NoOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.NoOrderFunc", "无单库存合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.TransferLibrary") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.TransferLibraryTotalFunc", "成品移库合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.SampleCloth") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.SampleClothFunc", "剪样布合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "stk.FinishProductProfitAndLoss") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("stk.FinishProductProfitAndLossTotalFunc", "成品损益单合计", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "Em.PurchaseOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("Em.PurchaseOrderSummaryFunc", "五金物料采购单合计查询", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "Em.InboundOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("Em.InboundOrderSummaryFunc", "五金入库合计报表", [this, info, function () { getBillListing(); }]);
                }
                else if (progId == "Em.OutboundOrder") {
                    Ax.utils.LibVclSystemUtils.openDataFunc("Em.OutboundOrderSummaryFunc", "五金出库合计报表", [this, info, function () { getBillListing(); }]);
                }
                else {
                    //Ax.utils.LibVclSystemUtils.openDataFunc("stk.CheckClothApplyPersonFunc", "选择处理人", [this, info, function () { getBillListing(); }]);
                }
            }
        });
        //外织造检验检验修改
        var outWeaveProductEdit = Ext.create(Ext.Action, {
            text: '检验修改',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var customerId = "";
                var orderId = "";
                var LabelFormatId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选一条数据");
                    return false;
                }
                var serialNo = "";
                if (records.length > 0) {
                    var serialNo = records[0].get("SERIALNO");

                    Ext.Ajax.request({
                        url: 'api/qccheckfinishproduct/IsUseCheckUpdate2',
                        jsonData: {
                            paramValue: serialNo
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ax.utils.LibVclSystemUtils.openBill("qc.OutWeaveProductEdit", BillTypeEnum.Bill, "检验修改", BillActionEnum.AddNew, undefined, undefined, {
                                    progId: this.progId, SERIALNO: serialNo, QcOutWeaveProductCallback: function () { getBillListing(); }
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //半成品检验修改
        var halfProductcheckEdit = Ext.create(Ext.Action, {
            text: '检验修改',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var customerId = "";
                var orderId = "";
                var LabelFormatId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选一条数据");
                    return false;
                }
                var serialNo = "";
                if (records.length > 0) {
                    var serialNo = records[0].get("SERIALNO");

                    Ext.Ajax.request({
                        url: 'api/qccheckfinishproduct/IsUseCheckUpdate2',
                        jsonData: {
                            paramValue: serialNo
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ax.utils.LibVclSystemUtils.openBill("qc.HalfProductWorkerUser", BillTypeEnum.Bill, "检验修改", BillActionEnum.AddNew, undefined, undefined, {
                                    progId: this.progId, SERIALNO: serialNo, QcHalfProductCallback: function () { getBillListing(); }
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //成品检验修改
        var finishProductcheckEdit = Ext.create(Ext.Action, {
            text: '检验修改',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var customerId = "";
                var orderId = "";
                var LabelFormatId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选一条数据");
                    return false;
                }
                var serialNo = "";
                if (records.length > 0) {
                    var serialNo = records[0].get("SERIALNO");

                    Ext.Ajax.request({
                        url: 'api/qccheckfinishproduct/IsUseCheckUpdate',
                        jsonData: {
                            paramValue: serialNo
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            else {
                                Ax.utils.LibVclSystemUtils.openBill("qc.FinishProductEdit", BillTypeEnum.Bill, "检验修改", BillActionEnum.AddNew, undefined, undefined, {
                                    progId: this.progId, SERIALNO: serialNo, QcFinsihProductCallback: function () { getBillListing(); }
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //成品检验新增
        var finishProductcheckAdd = Ext.create(Ext.Action, {
            text: '检验补录',
            iconCls: 'fa fa-save',
            handler: function () {
                Ax.utils.LibVclSystemUtils.openBill("qc.FinishProductAdd", BillTypeEnum.Bill, "检验补录", BillActionEnum.AddNew, undefined, undefined, {
                    progId: this.progId, QcFinsihProductCallback: function () { getBillListing(); }
                });
            }
        });

        //成品检验新增
        var finishProductcheckAddTwo = Ext.create(Ext.Action, {
            text: '检验补录(新)',
            iconCls: 'fa fa-save',
            handler: function () {
                Ax.utils.LibVclSystemUtils.openBill("qc.FinishProductAddTwo", BillTypeEnum.Bill, "检验补录", BillActionEnum.AddNew, undefined, undefined, {
                    progId: this.progId, QcFinsihProductCallback: function () { getBillListing(); }
                });
            }
        });

        //#region 外购检验修改
        //外购检验修改
        var OutPurchaseEdit = Ext.create(Ext.Action, {
            text: '检验修改',
            iconCls: 'fa fa-save',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选一条数据");
                    return false;
                }
                var _CHECKID = "";
                if (records.length > 0) {
                    var _CHECKID = records[0].get("CHECKID");
                    Ax.utils.LibVclSystemUtils.openBill("qc.OutPurchaseEdit", BillTypeEnum.Bill, "检验修改", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this.progId, CHECKID: _CHECKID, QcOutPurchaseEditCallback: function () { getBillListing(); }
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                //Ax.utils.LibVclSystemUtils.openBill("qc.OutPurchaseEdit", BillTypeEnum.Bill, "检验修改", BillActionEnum.AddNew, undefined, undefined, {
                //    progId: this.progId, QcOutPurchaseEditCallback: function () { getBillListing(); }
                //});
            }
        });
        //#endregion

        var smallLabelPrint_qc = Ext.create(Ext.Action, {
            text: '打印小标签',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var customerId = "";
                var orderId = "";
                var LabelFormatId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择要打印小标签的单据");
                    return false;
                }
                var serialNo = "";
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        if (progId == "stk.ProductReturnPrint") {
                            smallLabelPrint(records[i].get("SerialNo"));
                        }
                        else {
                            smallLabelPrint(records[i].get("SERIALNO"));
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //#region 打印外购单信息
        var outSourcePrint_qc = Ext.create(Ext.Action, {
            text: '打印外购单信息',
            iconCls: 'fa fa-print',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择要打印的单据");
                    return false;
                }
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一个单据打印");
                }
                else {
                    var billNo = records[0].get("BILLNO");
                    PrintOutSourcing(billNo);
                }
            }
        });
        //#endregion

        //#region 打印管内标签
        /**
         * 打印管内标签
         * */
        var inPipeLabelInfo_qc = Ext.create(Ext.Action, {
            text: '打印管内标签',
            iconCls: 'fa fa-print',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var customerId = "";
                var orderId = "";
                var LabelFormatId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择要打印管内标签的单据");
                    return false;
                }
                var serialNo = "";
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        inPipeLabelInfo(records[i].get("SERIALNO"));
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //#region SekoInTransitReport
        /****
         * SekoInTransitReport
         * */
        var SekoInTransitReport = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: 'SekoInTransitReport',
            handler: function () {
                var sheetId = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 0) {
                    Ext.Msg.alert("提示", "请选择单据");
                    return false;
                }
                else {
                    for (var i = 0; i < records.length; i++) {
                        sheetId.push(records[i].get("SHEETID"));
                    }

                }
                Ext.Msg.confirm("系统提示", "您确定要发送邮件", function (btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: 'api/goodstraffic/SendEmailSekoInTransitReport',
                            jsonData: {
                                paramValue: sheetId,
                                personName: Ext.util.Cookies.get("loginPersonName"),
                                personId: Ext.util.Cookies.get("loginPersonId"),
                                progId: "stk.GoodsTraffic",
                                buttonId: "SekoInTransitReport"
                            },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    return 0;
                                }
                                else {
                                    getBillListing();
                                    Ext.Msg.alert("提示", "操作成功！");
                                    return 1;
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                                return 0;
                            }
                        });
                    }
                });
            }
        });
        //#endregion

        //#region 染色布移库
        var DyeTransferLibrary = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-edit',
            text: '移库位',
            handler: function () {
                var vBarCodeList = [];

                var vdata = gridPanel.getView().getSelectionModel().getSelection();

                for (var i = 0; i < vdata.length; i++) {
                    vBarCodeList += vdata[i].get("SerialNo") + "\n";
                }
                if (vBarCodeList.length == 0) {
                    Ext.Msg.alert("提示", "请选择需要转库位的产品");
                }
                else {

                    Ax.utils.LibVclSystemUtils.openBill('stk.DyeTransferLibrary', BillTypeEnum.Bill, '移库位', BillActionEnum.AddNew, undefined, undefined, {
                        progObj: this,
                        serialNoList: vBarCodeList,
                        callbackFunc: function (obj) {

                        }
                    });
                }
            }
        });
        //#endregion


        //#region 批量复制产品工艺
        /**
         * 批量复制产品工艺
         * */
        var BatchCopyProduct = Ext.create(Ext.Action, {
            text: '批量复制',
            iconCls: 'fa fa-save',
            handler: function () {
                var productId, patternId;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    productId = records[0].get("PRODUCTID");
                    patternId = records[0].get("PATTERNID");
                    BatchCopyProductCraftFrom(productId, patternId, function () {
                        getBillListing();
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //#region 批量修改供应商(染色需求和并色需求表)
        /**
         * 批量修改供应商(染色需求和并色需求表)
         * */
        var BatchModifySupplier = Ext.create(Ext.Action, {
            text: '批量修改供应商',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BILLNO");
                        batchParams.push(value);
                    }
                    BatchModifySupplierFrom(batchParams, progId, function () {
                        getBillListing();
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });
        //#endregion

        //#region 半成品占用
        //半成品占用
        var Occup = Ext.create(Ext.Action, {
            text: '占用',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/halfproductmanagement/Occup',
                        jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "Occup" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //#endregion

        //#region 半成品取消占用
        //半成品取消占用
        var UnOccup = Ext.create(Ext.Action, {
            text: '取消占用',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        var value = records[i].get("BARCODE");

                        batchParams.push(value);
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: 'api/halfproductmanagement/UnOccup',
                        jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: "UnOccup" },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        });
        //#endregion

        //#region 转无单（半成品仓转无单）
        /**
         * 转无单（半成品仓转无单）
         * */
        var BtnWeavStockOut = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '色织布发出',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.HalfWeavStockOut", BillTypeEnum.Bill, "色织布发出", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        serialNoList: barCodeList,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });
        //#endregion

        //#region 修改库位
        /**
         * 修改库位
         * */
        var HalfProductWarehouse = Ext.create(Ext.Action, {
            text: '修改库位',
            iconCls: 'fa fa-save',
            handler: function () {
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                Ext.Ajax.request({
                    url: 'api/common/verpermission',
                    jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "HalfProductWarehouse" },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (result.Success) {
                            var records = gridPanel.getView().getSelectionModel().getSelection();
                            if (records.length > 0) {
                                var batchParams = [];
                                for (var i = 0; i < records.length; i++) {
                                    var pk = [];
                                    var pkStr = gridPanel.Pks[0];
                                    var value = records[i].get("BARCODE");
                                    batchParams.push(value);
                                }

                                Ext.Msg.prompt('提示', "请输入库位", function (btn, text) {
                                    if (btn == "ok") {
                                        Ext.Ajax.request({
                                            url: 'api/halfproductmanagement/UpdateWareHouse',
                                            jsonData: { paramValue: batchParams, commonField: text },
                                            method: 'POST',
                                            async: false,
                                            timeout: 90000000,
                                            success: function (response) {
                                                var result = Ext.decode(response.responseText);
                                                if (result.Message != null) {
                                                    Ext.Msg.alert("提示", result.Message);
                                                    getBillListing();
                                                }
                                            },
                                            failure: function (response) {
                                                Ext.Msg.alert("提示", "方法调用失败");
                                            }
                                        });
                                    }

                                });
                            }
                            else if (records.length == 0) {
                                Ext.Msg.alert("提示", "未选择数据");
                                return false;
                            }
                        }
                        else {
                            Ext.Msg.alert("提示", result.Message);
                            return false;
                        }
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                })
            }
        });
        //#endregion

        //#region 批量修改后整理路线
        /**
         * 批量修改后整理路线
         * */
        var BatchModifyAfterWayRoute = Ext.create(Ext.Action, {
            text: '批量修改后整理路线',
            iconCls: 'fa fa-save',
            handler: function () {
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                Ext.Ajax.request({
                    url: 'api/common/verpermission',
                    jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "BatchModifyAfterWayRoute" },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (result.Success) {
                            var batchParams = [];
                            var records = gridPanel.getView().getSelectionModel().getSelection();
                            if (records.length > 0) {
                                for (var i = 0; i < records.length; i++) {
                                    var value = records[i].get("PRODUCTATTRID");
                                    batchParams.push(value);
                                }
                                BatchModifyAfterWayRouteFrom(batchParams, progId, function () {
                                    getBillListing();
                                });
                            }
                            else {
                                Ext.Msg.alert("提示", "未选择数据");
                            }
                        }
                        else {
                            Ext.Msg.alert("提示", result.Message);
                        }

                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });

            }
        });
        //#endregion

        //#region 批量修改花型编码(产品工艺)
        /**
         * 批量修改花型编码(产品工艺)
         * */
        var BatchModifyFlowerCraft = Ext.create(Ext.Action, {
            text: '批量修改花型',
            iconCls: 'fa fa-save',
            handler: function () {
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                Ext.Ajax.request({
                    url: 'api/common/verpermission',
                    jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "BatchModifyFlowerCraft" },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (result.Success) {
                            var batchParams = [];
                            var records = gridPanel.getView().getSelectionModel().getSelection();
                            if (records.length > 0) {
                                for (var i = 0; i < records.length; i++) {
                                    var value = records[i].get("PRODUCTID");
                                    batchParams.push(value);
                                }
                                BatchModifyFlowerCraftFrom(batchParams, progId, function () {
                                    getBillListing();
                                });
                            }
                            else {
                                Ext.Msg.alert("提示", "未选择数据");
                            }
                        }
                        else {
                            Ext.Msg.alert("提示", result.Message);
                        }

                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });

            }
        });
        //#endregion

        //#region 批量修改(基准价格专用)
        /**
         * 批量修改(基准价格专用)
         * */
        var BatchModifyGuidePrice = Ext.create(Ext.Action, {
            text: '批量修改',
            iconCls: 'fa fa-save',
            handler: function () {
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                Ext.Ajax.request({
                    url: 'api/common/verpermission',
                    jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "BatchModifyGuidePrice" },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var pks = [];
                        var pkStr = gridPanel.Pks[0];
                        var records = gridPanel.getView().getSelectionModel().getSelection();
                        for (var i = 0; i < records.length; i++) {
                            if (records[i].get("CURRENTSTATE") != 1) {
                                Ext.Msg.alert("提示", "选中数据存在已生效数据，不能进行批量修改！");
                                return;
                            }
                            pks.push(records[i].get(pkStr));
                        }
                        Ax.utils.LibVclSystemUtils.openDataFunc("ds.ModifyGuidePriceFunc", "修改基准价格", [this, pks, function () { getBillListing(); }]);
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        });
        //#endregion

        //#region 批量修改缸号
        /**
         * 批量修改缸号
         * */
        var BatchModifySubbacthNo = Ext.create(Ext.Action, {
            text: '批量修改缸号',
            iconCls: 'fa fa-save',
            handler: function () {
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                Ext.Ajax.request({
                    url: 'api/common/verpermission',
                    jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "BatchModifySubbacthNo" },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (result.Success) {
                            var records = gridPanel.getView().getSelectionModel().getSelection();
                            if (records.length == 0) {
                                Ext.Msg.alert("提示", "未选择数据");
                            }
                            else if (records.length > 1) {
                                Ext.Msg.alert("提示", "只能选择一条记录进行操作!");
                            }
                            else {
                                var billNo = records[0].get('BILLNO');
                                var waveNo = records[0].get('WEAVNO');
                                BatchModifySubbacthNoForm(billNo, waveNo, function () {
                                    getBillListing();
                                });
                            }
                        }
                        else {
                            Ext.Msg.alert("提示", result.Message);
                        }

                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });

            }
        });
        //#endregion

        //#region 仓库确认（无单出库）
        /**
         * 仓库确认（无单出库）
         * */
        var WarehouseConfirm_NoOrder = Ext.create(Ext.Action, {
            text: '仓库确认',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/StkNoOrderStockOut/WarehouseConfirm";
                callCommonMethod_Radio(url, "WarehouseConfirm_NoOrder");
            }
        });
        //#endregion

        //#region 仓库反确认
        //仓库反确认
        var WarehouseConfirmNo_NoOrder = Ext.create(Ext.Action, {
            text: '仓库反确认',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/StkNoOrderStockOut/WarehouseUnConfirm";
                callCommonMethod_Radio(url, "WarehouseConfirmNo_NoOrder");
            }
        });
        //#endregion

        //#region 销售确认（无单销售）
        /**
         * 销售确认（无单销售）
         * */
        var SaleConfirm_NoOrder = Ext.create(Ext.Action, {
            text: '销售确认',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/StkNoOrderStockOut/SaleConfirm";
                callCommonMethod_Radio(url, "SaleConfirm_NoOrder");
            }
        });
        //#endregion

        //#region 销售反确认
        //销售反确认
        var SaleConfirmNo_NoOrder = Ext.create(Ext.Action, {
            text: '销售反确认',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/StkNoOrderStockOut/SaleUnConfirm";
                callCommonMethod_Radio(url, "SaleConfirmNo_NoOrder");
            }
        });
        //#endregion

        //#region 公用的调用方法 单选
        /**
         * 公用的调用方法 单选
         * @param {any} url 调用方法
         * @param {any} buttonName 按钮
         */
        var callCommonMethod_Radio = function (url, buttonName) {
            var batchParams = [];
            var personId = Ext.util.Cookies.get("loginPersonId");
            var personName = Ext.util.Cookies.get("loginPersonName");
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                var batchMethod = [];
                var count = gridPanel.Pks.length;

                for (var i = 0; i < records.length; i++) {
                    var pkStr = gridPanel.Pks[0];
                    var value = records[i].get(pkStr);

                    batchParams.push(value);
                }

                call.apply(this);
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
            }
            function call() {
                if (batchParams.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一条记录");
                }
                else {
                    Ext.Ajax.request({
                        url: url,
                        jsonData: { progId: progId, paramValue: batchParams[0], personId: personId, personName: personName, buttonId: buttonName },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }
        }
        //#endregion

        //#region 公用的调用方法 多选
        /**
         * 公用的调用方法 多选
         * @param {any} url 调用方法
         * @param {any} buttonName 按钮
         */
        var callCommonMethod_CheckBox = function (url, buttonName) {
            var batchParams = [];
            var personId = Ext.util.Cookies.get("loginPersonId");
            var personName = Ext.util.Cookies.get("loginPersonName");
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                var batchMethod = [];
                var count = gridPanel.Pks.length;

                for (var i = 0; i < records.length; i++) {
                    var pkStr = gridPanel.Pks[0];
                    var value = records[i].get(pkStr);

                    batchParams.push(value);
                }

                call.apply(this);
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
            }
            function call() {
                Ext.Ajax.request({
                    url: url,
                    jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: buttonName },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        Ext.Msg.alert("提示", result.Message);
                        getBillListing();
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        }
        //#endregion

        //#region 公用的调用方法指定字段 多选
        /**
         * 公用的调用方法指定字段 多选
         * @param {any} url 调用方法
         * @param {any} buttonName 按钮
         * @param {any} keyField 字段
         */
        var callCommonMethodField_CheckBox = function (url, buttonName, keyField) {
            var batchParams = [];
            var personId = Ext.util.Cookies.get("loginPersonId");
            var personName = Ext.util.Cookies.get("loginPersonName");
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                var batchMethod = [];
                var count = gridPanel.Pks.length;

                for (var i = 0; i < records.length; i++) {
                    var pkStr = keyField;
                    var value = records[i].get(pkStr);

                    batchParams.push(value);
                }

                call.apply(this);
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
            }
            function call() {
                Ext.Ajax.request({
                    url: url,
                    jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, buttonId: buttonName },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        Ext.Msg.alert("提示", result.Message);
                        getBillListing();
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        }
        //#endregion

        //#region 导出公用类
        /* 导出公用类
        * @param {any} url 地址
        * @param {any} typeId 类型（1：多选， 0:单选）
        * @param {any} filePath 文件地址
        * @param {any} buttonName 按钮名称
        * @param {any} keyField 主键字段
        */
        var exportCommonFunc = function (url, typeId, filePath, buttonName, keyField) {
            var sheetId = "";
            var bacthSheetId = [];
            var personId = Ext.util.Cookies.get("loginPersonId");
            var personName = Ext.util.Cookies.get("loginPersonName");
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                if (typeId == 0) {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能单选打印");
                        return;
                    }
                    else {
                        sheetId = records[0].get(keyField);
                    }
                }
                else {
                    for (var m = 0; m < records.length; m++) {
                        bacthSheetId.push(records[m].get(keyField));
                    }
                }
            }
            else {
                Ext.Msg.alert("提示", "未选择数据");
                return;
            }

            call.apply(this);
            function call() {
                Ext.Ajax.request({
                    url: url,
                    jsonData: { handle: UserHandle, progId: progId, paramValue: typeId == 0 ? sheetId : bacthSheetId, personId: personId, personName: personName, buttonId: buttonName },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (!result.Success) {
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        }
                        else {
                            var fileName = result.Enttity;
                            if (fileName && fileName !== '') {
                                DesktopApp.IgnoreSkip = true;
                                try {
                                    window.location.href = '/' + filePath + '/' + fileName;
                                } finally {
                                    DesktopApp.IgnoreSkip = false
                                }
                            }
                        }
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "方法调用失败");
                    }
                });
            }
        }
        //#endregion

        //#region 修改委外厂
        /**
         * 修改委外厂
         * */
        var EditSupplier_ProductDefect = Ext.create(Ext.Action, {
            text: '修改委外厂',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                    }

                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }

                Ax.utils.LibVclSystemUtils.openDataFunc("qc.UpdateDefectSupplierFunc", "修改委外厂", [this, batchParams, function () { getBillListing(); }, progId]);

            }
        });
        //#endregion

        //#region 导出合同——采购单
        /**
         * 导出合同——采购单
         * */
        var ExportOutSourcingExcel = Ext.create(Ext.Action, {
            text: '导出合同',
            handler: function () {
                var batchParams = [];
                var supplierId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get(pkStr);

                        batchParams.push(value);
                        if (supplierId == "") {
                            supplierId = records[i].get("SUPPLIERID");
                        }
                        else {
                            if (supplierId != records[i].get("SUPPLIERID")) {
                                Ext.Msg.alert("提示", "外购户需要一致");
                                return;
                            }
                        }
                    }
                    Ext.Ajax.request({
                        url: 'api/qcoutsourcet/ExportOutSourcingExcel',
                        jsonData: { paramValue: batchParams, progId: progId, commonField: supplierId },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/plsOutSourcing/plsOutSourcingExport/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
            }
        });

        var ExportOutSourcingExcel2 = Ext.create(Ext.Action, {
            text: '导出流水号',
            handler: function () {
                var batchParams = [];
                var supplierId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var billNo = "";
                    var count = gridPanel.Pks.length;
                    if (records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择要打印的单据");
                        return false;
                    }
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一个单据打印");
                    }
                    else {
                        var billNo = records[0].get("BILLNO");
                    }
                    Ext.Ajax.request({
                        url: 'api/qcoutsourcet/ExportOutSourcingExcel2',
                        jsonData: { progId: progId, commonField: billNo },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (!result.Success) {
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            }
                            else {
                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/plsOutSourcing/plsOutSourcingExport/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
            }
        });
        //#endregion

        //#region 打印外购到货单信息
        var outSourceArrivalPrint_qc = Ext.create(Ext.Action, {
            text: '打印信息',
            iconCls: 'fa fa-print',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length <= 0) {
                    Ext.Msg.alert("提示", "请选择要打印的单据");
                    return false;
                }
                if (records.length > 1) {
                    Ext.Msg.alert("提示", "只能选择一个单据打印");
                }
                else {
                    var billNo = records[0].get("BILLNO");
                    PrintOutSourcingArrival(billNo);
                }
            }
        });
        //#endregion

        //#region 生产通知--销售订单
        var SalOrder_PreSendProducePlan = Ext.create(Ext.Action, {
            text: '生产通知',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get("BILLNO");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'api/common/verpermission',
                            jsonData: { progId: progId, personId: personId, personName: personName, buttonId: "SalOrder_PreSendProducePlan" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (!result.Success) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    Ax.utils.LibVclSystemUtils.openDataFunc("sal.PreSendProducePlanFunc", "生产通知处理", [this, batchParams[0], function () { getBillListing(); }]);
                                }

                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }
        });
        //#endregion

        //#region 仓库记账（成品出库）
        /**
         * 仓库记账（成品出库）
         * */
        var WarehouseConfirm_StockOut = Ext.create(Ext.Action, {
            text: '仓库记账',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/finishproductstock/WareHouseConfirm";
                callCommonMethod_CheckBox(url, "WarehouseConfirm_StockOut");
            }
        });
        //#endregion

        //#region 取消仓库记账（成品出库）

        //#region 导出明细（半成品发出明细）
        /**
         * 导出明细（半成品发出明细）
         * */
        var HalfProductOutInfoTotal = Ext.create(Ext.Action, {
            text: '打印色织布发出模版',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/finishproductstock/GetHalfProductOutInfoTotal";
                exportCommonFunc(url, 0, "TempData/HalfProduct/HalfProductOutInfo", "HalfProductOutInfo", "BILLNO");
            }
        });
        //#endregion

        //#region 导出明细（半成品发出明细）
        /**
         * 导出明细（半成品发出明细）
         * */
        var HalfDyeProductOutInfoTotal = Ext.create(Ext.Action, {
            text: '打印染色布发出汇总',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/finishproductstock/GetDyeProductOutInfoTotal";
                exportCommonFunc(url, 0, "TempData/HalfProduct/DyeProductOutInfo", "DyeProductOutInfo", "BILLNO");
            }
        });

        /**
         * 取消仓库记账（成品出库）
         * */
        var UnWarehouseConfirm_StockOut = Ext.create(Ext.Action, {
            text: '取消仓库记账',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/finishproductstock/UnWareHouseConfirm";
                callCommonMethod_CheckBox(url, "UnWarehouseConfirm_StockOut");
            }
        });
        //#endregion

        //#region 导出明细（成品入库单明细）
        /**
         * 导出明细（成品入库单明细）
         * */
        var finishProductSotckInProductInfo = Ext.create(Ext.Action, {
            text: '导出明细',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/finishproductstock/GetFpStockInProduct";
                exportCommonFunc(url, 0, "TempData/FinishProduct/FinishProductStockIn", "finishProductSotckInProductInfo", "SHEETID");
            }
        });
        //#endregion

        //#region 导出明细（成品出库单明细）
        /**
         * 导出明细（成品出库单明细）
         * */
        var finishProductSotckOutProductInfo = Ext.create(Ext.Action, {
            text: '导出明细',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/finishproductstock/GetFpStockOutProduct";
                exportCommonFunc(url, 0, "TempData/FinishProduct/FinishProductStockOut", "finishProductSotckOutProductInfo", "SHEETID");
            }
        });
        //#endregion

        //#region 导出明细（无销售出库明细）
        /**
         * 导出明细（无销售出库明细）
         * */
        var NoOrderStockOutProductInfo = Ext.create(Ext.Action, {
            text: '导出明细',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/StkNoOrderStockOut/GetNoOrderProductInfo";
                exportCommonFunc(url, 0, "TempData/NoOrderStockOut/NoOrderStockOutProductInfo", "NoOrderStockOutProductInfo", "SHEETID");
            }
        });
        //#endregion

        //#region 导出明细（剪样布明细）
        /**
         * 导出明细（剪样布明细）
         * */
        var GetSampleClothProductInfo = Ext.create(Ext.Action, {
            text: '导出明细',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/StkSampleCloth/GetSampleClothProductInfo";
                exportCommonFunc(url, 0, "TempData/SampleCloth/GetSampleClothProductInfo", "GetSampleClothProductInfo", "SHEETID");
            }
        });
        //#endregion

        //#region 导出发货单信息（成品出库单明细）
        /**
         * 导出明细（成品出库单明细）
         * */
        var FpStockOutDeliverProductInfo = Ext.create(Ext.Action, {
            text: '导出发货单',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/finishproductstock/GetFpStockOutDeliverProductInfo";
                exportCommonFunc(url, 0, "TempData/FinishProduct/FpStockOutDeliverProductInfo", "FpStockOutDeliverProductInfo", "SHEETID");
            }
        });
        //#endregion


        //#region 转移到打卷打码（外购检验）
        /**
         * 转移到打卷打码（外购检验）
         * */
        var TransferProduct_QcOutPurchase = Ext.create(Ext.Action, {
            text: '转移到打卷打码',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/qcoutsourcet/ToOrderLabel";
                callCommonMethod_CheckBox(url, "TransferProduct_QcOutPurchase");
            }
        });
        //#endregion

        //未开收票进行开收票
        var NotInvoiceIn = Ext.create(Ext.Action, {
            text: '收票',
            iconCls: 'fa fa-print',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var vSheetId = [];
                var b = true;
                var customerId = "";
                var supplierId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        vSheetId.push(records[i].get("SHEETID"));
                        if (supplierId == "") {
                            supplierId = records[i].get("SUPPLIERID");
                        }
                        if (records[i].get("CURRENTSTATE") != 2 && records[i].get("CURRENTSTATE") != "2") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 生效 的才能收票");
                            break;
                        }
                        if (records[i].get("STATE") != 0 && records[i].get("STATE") != "0") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 未开 的才能收票");
                            break;
                        }
                        if (supplierId != records[i].get("SUPPLIERID")) {
                            b = false;
                            Ext.Msg.alert("提示", "请选择 同一个厂商 开票");
                            break;
                        }

                    }
                    if (b) {
                        if (vSheetId == null || vSheetId.length == 0) {
                            Ext.Msg.alert("提示", "请选择收票单据");
                            b = false;
                        }
                        if (b) {
                            var personId = Ext.util.Cookies.get("loginPersonId");
                            Ext.Ajax.request({
                                url: 'api/SupplyManagement/isnegativeinvoice',
                                jsonData: { progId: progId, objIds: vSheetId, supplierId: supplierId, personId: personId },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result != null && !result.Success) {
                                        b = true;
                                    }
                                    else {
                                        b = false;
                                        Ext.Msg.alert("提示", "该厂商存在负数的开票申请，需要选中一起收票");
                                    }
                                },
                                failure: function (response) {
                                    b = false;
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }

                        if (b) {
                            Ax.utils.LibVclSystemUtils.openBill("fin.PayInvoice", BillTypeEnum.Bill, "收票", BillActionEnum.AddNew, undefined, undefined, { progId: "fin.PayInvoice", progName: "收票", sheetIds: vSheetId, typeId: 1 });
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //未开收票进行开收票 -后整理
        var AfterNotInvoiceIn = Ext.create(Ext.Action, {
            text: '收票',
            iconCls: 'fa fa-print',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var vSheetId = [];
                var b = true;
                var customerId = "";
                var supplierId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        vSheetId.push(records[i].get("SHEETID"));
                        if (supplierId == "") {
                            supplierId = records[i].get("SUPPLIERID");
                        }
                        if (records[i].get("CURRENTSTATE") != 2 && records[i].get("CURRENTSTATE") != "2") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 生效 的才能收票");
                            break;
                        }
                        if (records[i].get("STATE") != 0 && records[i].get("STATE") != "0") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 未开 的才能收票");
                            break;
                        }
                        if (supplierId != records[i].get("SUPPLIERID")) {
                            b = false;
                            Ext.Msg.alert("提示", "请选择 同一个厂商 开票");
                            break;
                        }

                    }
                    if (b) {
                        if (vSheetId == null || vSheetId.length == 0) {
                            Ext.Msg.alert("提示", "请选择收票单据");
                            b = false;
                        }
                        if (b) {
                            var personId = Ext.util.Cookies.get("loginPersonId");
                            Ext.Ajax.request({
                                url: 'api/SupplyManagement/IsNegativeAfterInvoice',
                                jsonData: { progId: progId, objIds: vSheetId, supplierId: supplierId, personId: personId },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result != null && !result.Success) {
                                        b = true;
                                    }
                                    else {
                                        b = false;
                                        Ext.Msg.alert("提示", "该厂商存在负数的开票申请，需要选中一起收票");
                                    }
                                },
                                failure: function (response) {
                                    b = false;
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }

                        if (b) {
                            Ax.utils.LibVclSystemUtils.openBill("fin.AfterPayInvoice", BillTypeEnum.Bill, "收票", BillActionEnum.AddNew, undefined, undefined, { progId: "fin.AfterPayInvoice", progName: "收票", sheetIds: vSheetId, typeId: 1 });
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //未开收票进行开收票 -外加工
        var OutSrcNotInvoiceIn = Ext.create(Ext.Action, {
            text: '收票',
            iconCls: 'fa fa-print',
            /*            hidden: contains(permissionList, 6667, false, 'fPSOutSaleBooking', defineItems),*/
            handler: function () {
                var vSheetId = [];
                var b = true;
                var customerId = "";
                var supplierId = "";
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        vSheetId.push(records[i].get("SHEETID"));
                        if (supplierId == "") {
                            supplierId = records[i].get("SUPPLIERID");
                        }
                        if (records[i].get("CURRENTSTATE") != 2 && records[i].get("CURRENTSTATE") != "2") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 生效 的才能收票");
                            break;
                        }
                        if (records[i].get("STATE") != 0 && records[i].get("STATE") != "0") {
                            b = false;
                            Ext.Msg.alert("提示", "只有 未开 的才能收票");
                            break;
                        }
                        if (supplierId != records[i].get("SUPPLIERID")) {
                            b = false;
                            Ext.Msg.alert("提示", "请选择 同一个厂商 开票");
                            break;
                        }

                    }
                    if (b) {
                        if (vSheetId == null || vSheetId.length == 0) {
                            Ext.Msg.alert("提示", "请选择收票单据");
                            b = false;
                        }
                        if (b) {
                            var personId = Ext.util.Cookies.get("loginPersonId");
                            Ext.Ajax.request({
                                url: 'api/SupplyManagement/IsNegativeOutSrcInvoice',
                                jsonData: { progId: progId, objIds: vSheetId, supplierId: supplierId, personId: personId },
                                method: 'POST',
                                async: false,
                                timeout: 90000000,
                                success: function (response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result != null && !result.Success) {
                                        b = true;
                                    }
                                    else {
                                        b = false;
                                        Ext.Msg.alert("提示", "该厂商存在负数的开票申请，需要选中一起收票");
                                    }
                                },
                                failure: function (response) {
                                    b = false;
                                    Ext.Msg.alert("提示", "方法调用失败");
                                }
                            });
                        }

                        if (b) {
                            Ax.utils.LibVclSystemUtils.openBill("fin.OutSrcPayInvoice", BillTypeEnum.Bill, "收票", BillActionEnum.AddNew, undefined, undefined, { progId: "fin.OutSrcPayInvoice", progName: "收票", sheetIds: vSheetId, typeId: 1 });
                        }
                    }
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
            }
        });

        //#region 重新计算工资（半成品检验）
        /**
         * 重新计算工资（半成品检验）
         * */
        var UpdateWages_QcHalfProduct = Ext.create(Ext.Action, {
            text: '重新计算工资',
            iconCls: 'fa fa-save',
            handler: function () {
                var url = "api/halfproductmanagement/UpdateWages";
                callCommonMethod_CheckBox(url, "UpdateWages_QcHalfProduct");
            }
        });
        //#endregion

        //#region 修改备注（半成品明细）
        /**
         * 修改备注（半成品明细）
         * */
        var UpdateHalfProductRemarks = Ext.create(Ext.Action, {
            text: '修改备注',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var batchParams = [];
                if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                else {
                    for (var m = 0; m < records.length; m++) {
                        batchParams.push(records[m].get("BARCODE"));
                    }
                }
                Ext.Msg.prompt('修改备注', "", function (btn, text) {
                    if (btn == 'ok') {
                        Ext.Ajax.request({
                            url: '/api/halfproductmanagement/UpdateHalfProductRemarks',
                            jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, commonField: text, buttonId: "UpdateHalfProductRemarks" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Message != null) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                });
            }
        });

        var UpdatePIWidth = Ext.create(Ext.Action, {
            text: '修改坯布门幅',
            iconCls: 'fa fa-save',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var batchParams = [];
                if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                else {
                    for (var m = 0; m < records.length; m++) {
                        batchParams.push(records[m].get("FLOWERCRAFTID"));
                    }
                }
                Ext.Msg.prompt('修改坯布门幅', "", function (btn, text) {
                    if (btn == 'ok') {
                        Ext.Ajax.request({
                            url: '/api/halfproductmanagement/UpdateHalfProductRemarks2',
                            jsonData: { progId: progId, paramValue: batchParams, personId: personId, personName: personName, commonField: text, buttonId: "UpdateHalfProductRemarks" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Message != null) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                });
            }
        });

        //#endregion

        //#region 修改结束（试样任务单）
        /**
         * 修改结束（试样单）
         * */
        var SampleSheetFinish = Ext.create(Ext.Action, {
            text: '结束',
            iconCls: 'fa fa-save',
            handler: function () {

                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                //var batchParams = [];
                var inputParams;
                if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                else {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只可选择一条");
                        return false;
                    }
                    for (var m = 0; m < records.length; m++) {
                        //    batchParams.push(records[m].get("BARCODE"));
                        inputParams = records[m].get("BILLNO");
                    }
                }
                Ext.Msg.confirm('是否结束', "确定要结束", function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: '/api/design/SampleSheetFinish',
                            jsonData: { progId: progId, paramValue: inputParams, personId: personId, personName: personName, buttonId: "BtnSampleSheetFinish" },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Success) {
                                    Ext.Msg.alert("提示", "结束成功");
                                    getBillListing();
                                } else {
                                    Ext.Msg.alert("提示", result.Message);
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                });
            }
        });
        //#endregion

        //#region 导出码单
        /**
         * 导出码单
         * */
        var ExportCode = Ext.create(Ext.Action, {
            text: '导出码单',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var count = gridPanel.Pks.length;
                    if (progId == "stk.GoodsTraffic") {
                        for (var i = 0; i < records.length; i++) {
                            var pkStr = gridPanel.Pks[0];
                            var value = records[i].get(pkStr);

                            batchParams.push(value);
                        }

                        if (batchParams.length > 1) {
                            Ext.Msg.alert("提示", "只能选择一条单据");
                            return false;
                        }
                    }
                    else if (progId == "stk.FinishProductStockDetail") {
                        for (var i = 0; i < records.length; i++) {
                            var value = records[i].get("BARCODE");

                            batchParams.push(value);
                        }

                        if (batchParams.length <= 0) {
                            Ext.Msg.alert("提示", "请选择产品");
                            return false;
                        }
                    }
                    ExportCodeFunc(batchParams, progId, null);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
            }
        });
        //#endregion

        //#region 打印流水号新
        /**
         * 打印流水号新
         * */
        var PrintSerialNoNew = Ext.create(Ext.Action, {
            text: '打印流水号(新)',
            handler: function () {
                var batchParams = [];
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var msg = "确定要打印吗？";
                if (records.length == 0) {
                    Ext.Msg.alert("提示", "未选择数据");
                    return false;
                }
                else {
                    if (records.length > 1) {
                        Ext.Msg.alert("提示", "只能单选打印");
                        return false;
                    }
                }
                var BEAMSIGN = records[0].get("BEAMSIGN");
                if (BEAMSIGN == 2) {
                    msg = "该任务书对应下轴（经轴1细纱），确定是否要打印流水号？";
                }
                var WEAVNO = records[0].get("WEAVNO");
                Ext.Msg.confirm("系统提示", msg, function (btn) {
                    if (btn == "yes") {
                        Ax.utils.LibVclSystemUtils.openDataFunc("pls.WeavPlanPrintSerialNoFunc", "打印流水号", [this, [WEAVNO], function () { invorkBatchBcf("TakeRelease", false); getBillListing(); }]);
                    }
                });

            }
        });

        //#endregion

        //#region 审核后修改 -- 销售订单
        var saleOrderEdit = Ext.create(Ext.Action, {
            text: '审核后修改',
            handler: function () {
                var batchParams = [];
                var personId = Ext.util.Cookies.get("loginPersonId");
                var personName = Ext.util.Cookies.get("loginPersonName");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;

                    for (var i = 0; i < records.length; i++) {
                        var pkStr = gridPanel.Pks[0];
                        var value = records[i].get("BILLNO");

                        batchParams.push(value);
                    }

                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    if (batchParams.length > 1) {
                        Ext.Msg.alert("提示", "只能选择一条记录");
                    }
                    else {
                        Ax.utils.LibVclSystemUtils.openBill("sal.SaleOrderJFEdit", BillTypeEnum.Bill, "销售订单修改", BillActionEnum.AddNew, undefined, undefined, {
                            orderId: batchParams[0], SaleOrderCallback: function () {
                                getBillListing();
                            }
                        });
                    }
                }
            }
        });
        var FpStockOutPlan2 = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '一键制成品检验计划',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                var billno = "";
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        billno = records[i].get("BILLNO");
                    }
                }
                else if (records.length > 1) {
                    bState = false;
                    Ext.Msg.alert("提示", "只能选择一条数据");
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }

                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("qc.WaitCheckProduct", BillTypeEnum.Bill, "成品检验计划", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        billno: billno,
                        type: 1,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });

        var FpStockOutPlan1 = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '一键制成品检验计划',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                var billno = "";
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        billno = records[i].get("BILLNO");
                    }
                }
                else if (records.length > 1)  {
                    bState = false;
                    Ext.Msg.alert("提示", "只能选择一条数据");
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }

                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("qc.WaitCheckProduct", BillTypeEnum.Bill, "成品检验计划", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        billno: billno,
                        type:0,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });

        //#endregion

        //#region 成品出库（成品仓）
        /**
         * 成品出库（成品仓）
         * */
        var FpStockOut = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '成品出库',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.FinishProductStockOut", BillTypeEnum.Bill, "成品出库", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        barCodelList: barCodeList,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });
        //#endregion

        //#region 退回车间（成品仓）
        /**
         * 退回车间（成品仓）
         * */
        var FpStockReturn = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '退回车间',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.ReturnWorkShop", BillTypeEnum.Bill, "退回车间", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        barCodelList: barCodeList,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });
        //#endregion

        //#region 无单销售出库（成品仓）
        /**
         * 无单销售出库（成品仓）
         * */
        var FpNoOrderStockOut = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '无单销售出库',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.NoOrderStockOut", BillTypeEnum.Bill, "无单销售出库", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        barCodelList: barCodeList,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });
        //#endregion

        //#region 剪样布（成品仓）
        /**
         * 剪样布（成品仓）
         * */
        var FpSampleCloth = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '剪样布',
            handler: function () {
                var bState = true;
                var records = gridPanel.getView().getSelectionModel().getSelection();
                var productId = "";
                var barCodeList = [];
                if (records.length > 0) {
                    for (var i = 0; i < records.length; i++) {
                        barCodeList.push(records[i].get("BARCODE"));
                    }
                }
                else {
                    bState = false;
                    Ext.Msg.alert("提示", "未选择数据");
                }
                if (bState) {
                    Ax.utils.LibVclSystemUtils.openBill("stk.SampleCloth", BillTypeEnum.Bill, "剪样布", BillActionEnum.AddNew, undefined, undefined, {
                        progId: this,
                        barCodelList: barCodeList,
                        callbackFunc: function () { getBillListing(); }
                    });
                }
            }
        });
        //#endregion

        //#region 任务书---查应结束任务
        /**
         * 任务书---查应结束任务
         * */
        var SearchWeavNeedEnd = Ext.create(Ext.Action, {
            //xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '查应结束任务',
            handler: function () {
                MenuClass.itemClick({ PROGID: null, MENUITEM: "查应结束", IFRAMEURL: "http://" + window.location.hostname + ":9956/#/weavingEndProductPlan" });
                //Ax.utils.LibVclSystemUtils.openDataFunc("ds.ModifyGuidePriceFunc", "修改基准价格", [this, pks, function () { getBillListing(); }]);
            }
        });
        //#endregion

        //#region 任务书---查应结束任务
        /**
         * 推送协同制造
         * */
        var CmpPushOrder = Ext.create(Ext.Action, {
            //xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '推送',
            handler: function () {
                var batchParams = [];
                var personid = Ext.util.Cookies.get("loginPersonId");
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length > 0) {
                    var batchMethod = [];
                    var count = gridPanel.Pks.length;
                    for (var i = 0; i < records.length; i++) {
                        var pk = "";
                        for (var r = 0; r < count; r++) {
                            var pkStr = gridPanel.Pks[r];
                            var value = records[i].get(pkStr);

                            pk = value;

                            if (progId == "pls.WeavPlan") {
                                pk = records[i].get("WEAVNO");
                            }
                        }

                        if (records[i].get("CURRENTSTATE") != 2) {
                            Ext.Msg.alert("提示", "只可推送生效信息");
                            return;
                        }

                        if (progId == "pls.WeavPlan" && records[i].get("WEAVWAY") != 1) {
                            Ext.Msg.alert("提示", "只可推送织造方式为 外的信息");
                            return;
                        }

                        batchParams.push(pk);
                    }

                    if (progId == "stk.HalfWeavStockOut") {
                        Ax.utils.LibVclSystemUtils.openDataFunc("cmp.HalfWeavStockOutTRequireFunc", "工艺要求信息", [this, batchParams, true]);
                        return;
                    }
                    call.apply(this);
                }
                else {
                    Ext.Msg.alert("提示", "未选择数据");
                }
                function call() {
                    Ext.Ajax.request({
                        url: '/api/Cmp/PushOrder',
                        jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert("提示", result.Message);
                            getBillListing();
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            },
            menu: [{
                text: '撤回',
                //cls: 'fa fa-copy',
                handler: function () {
                    var batchParams = [];
                    var personid = Ext.util.Cookies.get("loginPersonId");
                    var records = gridPanel.getView().getSelectionModel().getSelection();
                    if (records.length > 0) {
                        var batchMethod = [];
                        var count = gridPanel.Pks.length;
                        for (var i = 0; i < records.length; i++) {
                            var pk = "";
                            for (var r = 0; r < count; r++) {
                                var pkStr = gridPanel.Pks[r];
                                var value = records[i].get(pkStr);

                                pk = value;

                                if (progId == "pls.WeavPlan") {
                                    pk = records[i].get("WEAVNO");
                                }
                            }
                            batchParams.push(pk);
                        }
                        call.apply(this);
                    }
                    else {
                        Ext.Msg.alert("提示", "未选择数据");
                    }
                    function call() {
                        Ext.Ajax.request({
                            url: '/api/Cmp/CancelOrder',
                            jsonData: { handle: UserHandle, progId: progId, batchParams: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert("提示", result.Message);
                                getBillListing();
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            }]
        });
        //#endregion

        //#region 协同制造-工艺变更
        /**
         * 协同制造-工艺变更
         * */
        var CmpTRequireChange = Ext.create(Ext.Action, {
            xtype: 'splitbutton',
            iconCls: 'fa fa-reply',
            text: '工艺变更',
            handler: function () {
                var records = gridPanel.getView().getSelectionModel().getSelection();
                if (records.length == 1) {
                    var batchParams = [];
                    batchParams.push(records[0].get("BILLNO"));
                    Ax.utils.LibVclSystemUtils.openDataFunc("cmp.HalfWeavStockOutTRequireFunc", "工艺要求信息", [this, batchParams, false]);
                }
                else {
                    Ext.Msg.alert("提示", "请选择一条数据");
                }
            }
        });
        //#endregion

        //#endregion 自定义按钮 代码结束

        //#region 页面顶部菜单按钮控制
        //查询select, 批量修改batchEditForm, 刷新refresh, 浏览browse, 新增addNew, 修改edit, 删除deleteBill, 送审submitAudit, 撤回retract, 审核audit, 生效release, 反生效backrelease, 作废invalid, 结案endCase, 清单returnListing, 上一页upPage, 下一页downPage, 导入importData, 导出exportData, 设置查询方案setSearchScheme, 保存方案saveDisplayScheme
        //【前面3个必须是】查询select, 刷新refresh, 浏览browse【不要调换位置】
        if (progId == "com.DyePrice") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, BatchModify, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.AfterWayRecord") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, /*doCalculateYield,*/ endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfWeavStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, /*HalfProductOutInfoTotal,*/ CmpTRequireChange,/* CmpPushOrder,*/ /*printBillStock,*/ invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfWeavStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, UpdateHalfPrice,invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, /*FpStockOutPlan2,*/ endCase, SelectBillTotalFunc, importData, exportData, print, ExportStkHalfWeavStockInExcel, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.WeavStockReturn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, btnFSM, btnFSMNot, invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.WarpStockReturn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, btnFSM, btnFSMNot, invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.WeavStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, btnFSM,btnFSMNot,invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.WarpStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, btnFSM,btnFSMNot,invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OutsourcingStockReturn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OutsourcingStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, UpdateOutPrice, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OutsourcingStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OutsourcingClaimant" || progId == "stk.OutsourcingStockLoss") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.PurMaterialStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, UpdateOutPrice,FinanceConfirm, FinanceConfirmNot, printBillStock, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.PurMaterialStockReturn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, UpdateOutPrice, invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.MaterialLoss") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.TakeawayStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, printBillStock, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfAccountDetail") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, Allocation, WaitDyeStock, /*Occup, UnOccup,*/ HalfProductWarehouse, qcTranQuality, qcTranState,/* HalfStockNoOrder,*/ BtnWeavStockOut, UpdateHalfProductRemarks, /*EndSerialNo,*//* HalfChangeProduct,*/ invalid, submitAudit, audit, endCase, SelectBillRpt, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.Outsourcing") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, ExportOutSourcingExcel, ExportOutSourcingExcel2,  printSerialno, MoreSerialOutOrder,/*printContract, *//*printSerialno,*/ invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.OutsourcingArrival") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, outSourceArrivalPrint_qc, invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme, upPage, downPage];
        }
        else if (progId == "ds.Proofing") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, printPz, invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "ds.ProofingTask") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, doTaskPerson, doYarnState, doWarehouse, doComplete, invalid, submitAudit, audit, endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "ds.Product") {
            items = [select, refresh, browse, addNew, BatchCopyProduct, BatchModifyFlowerCraft, edit, deleteBill, /*doProofingTask, printPro,*/ invalid, retract, submitAudit, audit, deAudit, endCase, SelectBillRpt, SelectBillTotalFunc, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme, btnImportProductInfo, btnImportProductCraftImageFn, btnGenerateAttr, btnFS, btnFSNot];
        }
        //20250114专门为了查汇总和查合计，增加的菜单按钮  start
        else if (progId == "sal.BackupOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OutsourcingAccount") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OtherMaterialStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OtherMaterialStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.MaterialTakeout") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.ProductCut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.NoOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "Em.TransferBoundOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "com.BeamType") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.PickMaterial") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.WarpWork") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.WarpToWeav") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.WeavWork") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.OutWeave") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.FinishProductStockDetail") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfAfterAccount") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfAllocation") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.TransferLibrary") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "Em.PurchaseOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "com.MaterialType") {
            items = [select, refresh, browse, addNew, edit, deleteBill, invalid, btnTBAfter,importData, exportData, print, saveDisplayScheme];
        }
        //20250114专门为了查汇总和查合计，增加的菜单按钮  end
        else if (progId == "com.ProductAssignAttr") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, deAudit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];

        }
        else if (progId == "pls.WarpPracticable") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, printV1, WeavOrder, saveDisplayScheme, setSearchScheme, btnCalcWarpMaterialFn, AddZHOU];
            printV1.setText('打印经轴卡');
        }
        else if (progId == "pm.PersonData") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, ExportRoster, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.WeavPlan") {
            items = [select, refresh, browse, addNew, edit, BatchModifySubbacthNo, deleteBill, release, backrelease, lookMaterial, MoreSerial, invalid, submitAudit, audit, endCase, importData, exportData, printV1,/* printSerialno,*/ /*printWeavPlanLabel, */PrintSerialNoNew, /*SearchWeavNeedEnd,*/AddHalfRemark, saveDisplayScheme, setSearchScheme];
            printV1.setText('打印任务书');
        }
        else if (progId == "stk.Claimant3") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, printClaimant3, /*ChangeClaimantSupplier,*//*SearchWeavNeedEnd,*/ saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.WarpPlan") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportDataV1, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sp.TwistSchedule" || progId == "sp.DyeSchedule") {
            items = [select, refresh, browse, addNew, BatchModifySupplier, edit, deleteBill, release, backrelease, createOrder, invalid, submitAudit, audit, endCase, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sp.PurchaseSchedule") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, createOrder, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.HandProducePlan") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.Account") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, SelectAccountSub, SelectNoOrderNum, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.AccountDetail") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, SelectAccountSub, SelectNoOrderNum, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        //#region 五金仓库 todo:vic

        else if (progId == "Em.InboundOrder") {

            items = [select, refresh, browse, addNew, edit, deleteBill
                , release, backrelease
                , saveDisplayScheme, setSearchScheme
                , FinanceConfirm, FinanceConfirmNot
                , SelectBillTotalFunc, importData, exportData
                , print, BtnExportNew
            ];

        }
        else if (progId == "Em.OutboundOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill
                , release, backrelease
                , saveDisplayScheme, setSearchScheme
                , FinanceConfirm, FinanceConfirmNot, SelectBillTotalFunc
                , importData, exportData, BtnExportNew
                , btnExportEmOutboundOrderBill
            ];
        }
        else if (progId == "Em.ReBoundOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill
                , release, backrelease
                , saveDisplayScheme, setSearchScheme
                , FinanceConfirm, FinanceConfirmNot
                , importData, exportData, BtnExportNew
                , btnExportEmOutboundOrderBill
            ];
        }
        else if (progId == "Em.EquipLossProfitOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme];
        }

        //#endregion

        else if (progId == "com.FlowerCraft") {
            items = [select, refresh, browse, addNew, edit, deleteBill, saveDisplayScheme, setSearchScheme, UpdatePIWidth
                //, release, backrelease, btnWarpWeftColorImport, btnGenerateProduct
                //, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme
                , importData, exportData
                , /*btnImportFlowerCraftFromXlsbtnExportProductCraftBill, btnWarpWeftColorExport,*/ uploadFlowerWenBanFn, showFlowerWenBanFn
            ];
        }
        else if (progId == "com.FlowerAttr") {
            items = [select, refresh, browse, addNew, edit, deleteBill, importData, exportData, saveDisplayScheme, setSearchScheme
                //, release, backrelease
                //, invalid, submitAudit, audit, endCase,  print, saveDisplayScheme, setSearchScheme
                , btnFlowerAttrImport
            ];
        }
        else if (progId == "Ds.ProductAttr") {
            items = [select, refresh, browse, addNew, edit, deleteBill, BatchModifyAfterWayRoute, saveDisplayScheme, setSearchScheme
                , importData, exportData
                //, release, backrelease
                //, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme
                , btnGenerateProdCraf
            ];
        }
        else if (billType == BillTypeEnum.Master) {
            if (progId == "com.Customer") {
                items = [select, refresh, browse, addNew, edit, deleteBill, submitAudit, audit, importData, exportData, print, CustomerOrderProductExcel, saveDisplayScheme, setSearchScheme];

            }
            else {
                items = [select, refresh, browse, addNew, edit, deleteBill, submitAudit, audit, importData, exportData, print, saveDisplayScheme, setSearchScheme];
            }
        }
        else if (progId == "stk.FinishProductReturn") {
            release.initialConfig.menu = [];
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, submitAudit, saveDisplayScheme, setSearchScheme, /*batchPrint,*/ productReturnPrint];
        }
        else if (progId == "stk.FinishProductAllocation") {
            release.initialConfig.menu = [];
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, submitAudit, saveDisplayScheme, setSearchScheme/*, batchPrint, upPage, downPage*/];
        }
        else if (progId == "stk.FinishProductStockOut") {
            release.initialConfig.menu = [];
            items = [select, refresh, browse, addNew, edit, deleteBill, submitAudit, audit, SelectBillTotalFunc, exportData, finishProductSotckOutProductInfo, FpStockOutDeliverProductInfo, release, backrelease, submitAudit, FinanceConfirm, FinanceConfirmNot, /*MergeStockOut,*//* fPSOutSaleConfirm, fPSOutSaleConfirmNot,*/ /*FinanceConfirm, FinanceConfirmNot, *//*fPSOutSaleBooking,*/ WarehouseConfirm_StockOut, UnWarehouseConfirm_StockOut, /*fPSOutPrintProductInfo, fPSOutPrintProductSummary,PrintStockOutCodeIn, PrintStockOutCodeOut,*/ saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.FinishProductOffsetSerial") {
            items = [select, refresh, browse, edit, release, backrelease, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sal.SaleOrderJF") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, deAudit, SalOrder_PreSendProducePlan, /*saleOrderUpload,*/ upLoadSamplecloth, /*saleOrderEnd,*/ labelConfiguration, FinanceConfirm, FinanceConfirmNot, saleOrderEdit, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.FinishProductOffset") {
            release.initialConfig.menu = [];
            items = [select, refresh, browse, addNew, edit, deleteBill, release, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme, setSearchScheme];
        }
        else if (progId == "sp.PurchaseOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, FinanceAuditConfirm, FinanceAuditConfirmNot, importData, exportData, /*UpdateOutOrder,*/ print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sp.DyeOrder") {
            items = [select, refresh, browse, addNew, edit, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, /*UpdateOutOrder,*/ print, saveDisplayScheme, setSearchScheme, deleteBill];
        }
        else if (progId == "sp.TwistOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, calcMaterial, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, /*UpdateOutOrder,*/ print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.FinishProductBarCode") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, /*printLabel,*/ finishProductPrintReCodeLabel, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.FinishProductStockDetail") {
            items = [select, refresh, browse, addNew, edit, FpStockAllocationApply, FpStockTransferLibrary, importEquipmentQRCode5,FpStockNoOrder, ExportCode, FpStockOut, FpStockReturn, FpNoOrderStockOut, FpSampleCloth, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, /*batchPrint,*/ print, saveDisplayScheme, setSearchScheme /*productStockPrint, */];
        }
        else if (progId == "sal.CollectionAmount") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme, FinanceConfirm];
        }
        else if (progId == "sal.Advances" || progId == "sal.Discount") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.HalfProductCutSerialNo") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme, HalfProductCutPrint];
        }
        else if (progId == "qc.HalfProductRepair") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme, halfProductRepairPrint];
        }
        else if (progId == "qc.FinishProductRepairBarCode") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme, finishProductRepairPrint];
        }
        else if (progId == "qc.PurCheckOrder" || progId == "qc.OutCheckOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, colorIsOK, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sal.NotInvoice") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, NotInvoiceOut, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.GoodsTraffic") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, SendOrderPrice, BathEditGoodsTraffic, invalid, submitAudit, audit, SelectBillTotalFunc, /*deAudit,*/ importData, /*MergeGoodsTraffic,*/ /*GoodsTrafficFinanceConfirm, GoodsTrafficFinanceConfirmNot,*/ GoodsTrafficSaleBooking, GoodsTrafficSaleBookingNot,/*goodsTrafficProductInfo, GoodsTrafficProductSummary, GoodsTrafficLzbSummary,*/ ProductModelPrint, ProductModelTotalPrint, ExportCode, /*InvoiceAPrint, InvoiceBPrint, InvoiceCPrint, *//*InTradeDetailedPrint, ExportTradeDetailedPrint, PackBillAPrint, PackBillPrint,*/ /*SekoInTransitReport,*/ exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.OutherWeaveAccountAdjustment") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, OutherWeaveInvoice, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.ZeroShear") {
            items = [select, refresh, browse, addNew, edit, deleteBill, CommonSaleConfirm, CommonUnSaleConfirm, release, backrelease, ZeroshearPrint, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "fin.PareParts") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, ParePartsStockInPrint, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sal.SaleOrderLabel") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, printSaleOrderLabel, /*inPipeLabelInfo_qc,*/ CancelBigLabel, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.ReturnGoodsNotice") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.ReturnGoodsDealWith") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, ReturnGoodsDealWith, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfWaitDyeStockDetail") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, DyeTransferLibrary, InHalfProductStock, qcTranQuality3, /*DyedClothEmits, */invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.SaleOrderAllocation") {
            items = [select, refresh, browse, addNew, edit, deleteBill, passSaleOrderAllocation, notPassSaleOrderAllocation, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.CheckClothApply") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, exportCheckClothApply, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.QcAfterWayRepairLog") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SetSalary, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.FinishProductStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, importEquipmentQRCode4, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.AfterWay") {
            items = [select, refresh, browse, addNew, edit, deleteBill
                , release, backrelease, saveDisplayScheme, setSearchScheme
                , importData, exportData
                //, invalid, submitAudit, audit, endCase,  print, saveDisplayScheme,     
                , btnPrintAfterWayTranCard
            ];
        }
        else if (progId == "pls.AfterBind") {
            items = [select, refresh, browse, addNew, edit, deleteBill
                , release, backrelease, saveDisplayScheme, setSearchScheme
                //, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme,     
                , btnPrintAfterBindWayTranCard
            ];
        }
        else if (progId == "stk.MoveStock") {//移库管理
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData, printBillStock, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.FinishProductRepair") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, /*qcTranQuality,*/ invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "com.CustomerProduct") {
            items = [select, refresh, browse, addNew, edit/*, CustomerProductUpload*/, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.OutsourcingPlan") {
            items = [select, refresh, browse, addNew, edit, deleteBill, createOutOrder, batchChangeSupplierID,/*release, backrelease, *//*printOutsourcing, *//*printContract, *//*printSerialno,*/ invalid, /*submitAudit, audit, */endCase, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sp.MaterialSchedule") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, /*OrderChangeEffect,*/ submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sal.SaleOrderUpdateQuantityApply") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.FpAllocationApply") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, /*ChangeFpAllocationApply,*/ BathFpAllocationApply, invalid, submitAudit, audit, endCase, SelectBillRpt, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.ReturnWorkShop") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.ProductReturnPrint") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, printSaleOrderLabelProductReturn, smallLabelPrint_qc, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.HalfProduct") {
            items = [select, refresh, browse, addNew, edit, halfProductcheckEdit, halfProductShowDefect, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, UpdateWages_QcHalfProduct, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.FinishProduct") {
            items = [select, refresh, browse, addNew, edit, finishProductcheckAdd, finishProductcheckAddTwo, finishProductcheckEdit, deleteBill, release, backrelease, smallLabelPrint_qc, /*inPipeLabelInfo_qc,*/ invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.WarpBeamAccountDetail") {
            items = [select, refresh, browse, addNew, edit, btnCancelWarpDetailStk, deleteBill, release, backrelease /*, invalid*/, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "pls.WarpToWeavPracticable") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData/*, print*/, saveDisplayScheme, btnCalcWeftMaterialFn, setSearchScheme];
        }
        else if (progId == "stk.HalfDyeStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, UpdateHalfPrice, invalid, submitAudit, audit, /*FpStockOutPlan1*/, FinanceConfirm, FinanceConfirmNot, print, endCase, SelectBillTotalFunc, importData, exportData, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfDyeStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease,/* HalfDyeProductOutInfoTotal,*/ invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, SelectBillTotalFunc, importData, exportData, print,/*printBillStock,*/ saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.FinishProductPrintCode") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, smallLabelPrint_qc, finishProductPrintCodeLabel, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.Claimant") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.NoOrderStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, WarehouseConfirm_NoOrder, WarehouseConfirmNo_NoOrder, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, NoOrderStockOutProductInfo, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sal.NoOrder") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, SaleConfirm_NoOrder, SaleConfirmNo_NoOrder, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.HalfProductDefec") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, EditSupplier_ProductDefect, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.FinishProductDefect") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, /*EditSupplier_ProductDefect,*/ invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData/*, print*/, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.HalfProductSendOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.FinishProductProfitAndLoss") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.SampleCloth") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, SelectBillTotalFunc, importData, exportData, GetSampleClothProductInfo, print, saveDisplayScheme, setSearchScheme];
        }

        else if (progId == "stk.HalfProfitAndLoss") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, SelectBillTotalFunc, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.ProductReturnStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "ds.GuidePrice") {
            items = [select, refresh, browse, addNew, edit, BatchModifyGuidePrice, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, FinanceConfirm, FinanceConfirmNot, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "ds.GuidePriceRate") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, FinanceConfirm, FinanceConfirmNot, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sal.CustomerProductQuote") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, FinanceConfirm, FinanceConfirmNot, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sal.CustQuoteProductRate") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, FinanceConfirm, FinanceConfirmNot, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.OutStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, FinanceConfirm, FinanceConfirmNot, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.OutPurchaseReturn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, FinanceConfirm, FinanceConfirmNot, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.FinishProductStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, finishProductSotckInProductInfo, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.ProofingStockOut" || progId == "stk.ProofingStockReturn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, importData, exportData, printBillStock, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.OutPurchase") {
            items = [select, refresh, browse, addNew, edit, OutPurchaseEdit, TransferProduct_QcOutPurchase, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "qc.OutWeaveProduct") {
            items = [select, refresh, browse, addNew, edit, outWeaveProductEdit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, SelectBillTotalFunc, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        } else if (progId == "sm.SampleCost") { //样本成本表
            items = [select, refresh, browse, addNew, edit, PrintSampleCost, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot, BtnExportNew, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sm.SampleStockOut") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, importData, exportData, print, BtnExportNew, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sm.SampleStockIn") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, FinanceConfirm, FinanceConfirmNot, endCase, importData, exportData, print, BtnExportNew, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "fin.NotPayInvoice") {
            items = [select, refresh, browse, NotInvoiceIn, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "fin.OutSrcNotPayInvoice") {
            items = [select, refresh, browse, OutSrcNotInvoiceIn, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "fin.AfterNotPayInvoice") {
            items = [select, refresh, browse, AfterNotInvoiceIn, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "Em.EquipInventory") {
            items = [select, refresh, browse, invalid, endCase, exportData, print, BtnExportNew, BtnSelectTaiZhang, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "sm.SampleAccount") {
            items = [select, refresh, browse, invalid, endCase, exportData, print, BtnExportNew, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "Em.InventoryPostDetail") {
            items = [select, refresh, browse, invalid, endCase, exportData, print, BtnExportNew, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "stk.LossCloth") {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, FinanceConfirm, FinanceConfirmNot,invalid, endCase, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "ds.SampleSheet") { //试样任务单  20250120从伊丝顿拷贝
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, SampleSheetFinish, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }
        else if (progId == "com.cmpPushCenter") {//协同推送中心
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease/*, CmpPushCenter*/, exportData, saveDisplayScheme, setSearchScheme, upPage, downPage];
        }
        else if (progId == "sp.ArrivalTransfer") {//到货中转
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease/*, PrepareDocument*/, exportData, saveDisplayScheme, setSearchScheme, upPage, downPage];
        }
        else {
            items = [select, refresh, browse, addNew, edit, deleteBill, release, backrelease, invalid, submitAudit, audit, endCase, importData, exportData, print, saveDisplayScheme, setSearchScheme];
        }

        //#endregion 页面顶部菜单按钮控制
        return items;
    }
};

//#region 独立函数 代码开始
/**
 * 产品工艺复制时判断是否存在对应的产品属性
 * @param {progId}页面定义的progId
 * @param {curPks}被复制的原产品型号
 */
function hasProductAttr(progId, curPks) {
    var canOpen = false;
    if (progId == 'ds.Product') {
        Ext.Ajax.request({
            url: 'api/DsProduct/HasProductAttr',
            jsonData: { paramValue: curPks },
            method: 'POST',
            async: false,
            timeout: 90000000,
            success: function (response) {
                result = Ext.decode(response.responseText);
                if (result.Success) {
                    if (result.Enttity.length == 0)
                        canOpen = true;
                    else {
                        var ex = [];
                        for (var i = 0; i < result.Enttity.length; i++) {
                            ex.push({ kind: 2, msg: '产品型号【' + result.Enttity[i] + '】未创建产品属性，请检查！' });
                        }
                        Ax.utils.LibMsg.show(ex);
                        canOpen = false;
                    }
                }
                else {
                    Ext.Msg.alert("提示", result.Message);
                    canOpen = false;
                }
            },
            failure: function (response) {
                Ext.Msg.alert("提示", "方法调用失败");
                canOpen = false;
            }
        })
    }
    else {
        canOpen = true;
    }
    return canOpen;
}

/**
 * 
 * 成品出库生效
 * 
 * */
function FinishProductStockOutRelase(gridPanel, batchParams) {
    var result;

    Ext.Ajax.request({
        url: 'api/finishproductstock/judgeproductoutnum',
        jsonData: { sheetId: batchParams },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });

    return result;
}

/**
 * 
 * 外购计划生效
 * 
 * */
function OutPlanRelase(batchParams) {
    var result;

    Ext.Ajax.request({
        url: 'api/StkOutsourcingStock/judgePlanoutnum',
        jsonData: { sheetId: batchParams },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });

    return result;
}

/**
 * 
 * 外购计划生效
 * 
 * */
function AddPlanRelase(batchParams) {
    var result;

    Ext.Ajax.request({
        url: 'api/StkOutsourcingStock/AddPreparationSalesOrder',
        jsonData: { sheetId: batchParams },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result.Success) {
                return result.Success;
            }
            else {
                Ext.Msg.alert("提示", result.Message);
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });

    return result;
}

/**
 * 判断是否存在子客户
 * @param {any} batchParams 选择的客户编码
 * @param {any} operateType [删除,作废]
 * @param {any} vfunc 回调方法
 */
function IsExistSubCustomer(batchParams, operateType, vfunc) {
    Ext.Ajax.request({
        url: 'api/Customer/IsExistSubCustomer',
        jsonData: { objIds: batchParams },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            //存在子客户
            if (!result.Success) {
                Ext.Msg.confirm("系统提示", "客户编码：" + result.Message + " 存在子客户，您确定要进行该操作吗？", function (btn) {
                    if (btn == "yes") {
                        vfunc();
                    }
                });
            }
            else {
                if (operateType == '删除') {
                    Ext.Msg.confirm('系统提示', '确定要删除吗？', function (btn) {
                        if (btn === 'yes') {
                            vfunc();
                        }
                    })
                }
                else {
                    vfunc();
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

//#region 判断客户咨信
/**
 * 判断客户咨信
 * @param {any} sheetId 选中的信息
 */
function VelCustCredit(sheetId) {
    var result;
    Ext.Ajax.request({
        url: 'api/saleorder/VelCustCredit',
        jsonData: { paramValue: sheetId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}
//#endregion

//#region 判断原料起订量
/**
 * 判断原料起订量
 * @param {any} BILLNO 选中的信息
 */
function VelMaterialMiniNum(BILLNO) {
    var result;
    Ext.Ajax.request({
        url: 'api/PurchaseOrder/VelMaterialMiniNum',
        jsonData: { paramValue: BILLNO },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}
//#endregion

//#region 整经报工：结案判断计划米数
/**
 * 整经报工：结案判断计划米数
 * @param {any} BILLNO 选中的信息
 */
function VelWarpWorkCheckEndCase(BILLNO) {
    var result;
    Ext.Ajax.request({
        url: 'api/planmanagement/VelWarpWorkCheckEndCase',
        jsonData: { paramValue: BILLNO },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}
//#endregion

//#region 任务书：结案判断是否选中同一计划的上下轴
/**
 * 任务书：结案判断是否选中同一计划的上下轴
 * @param {any} BILLNOs 选中的信息
 */
function VelWeavCheckEndCase(BILLNOs) {
    var result;
    Ext.Ajax.request({
        url: 'api/planmanagement/VelWeavCheckEndCase',
        jsonData: { paramValue: BILLNOs },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}
//#endregion

//#region 验证无单出库跟无单销售中的是否一致
/**
 * 验证无单出库跟无单销售中的是否一致
 * @param {any} sheetId 选中的信息
 */
function VerStockOutData(sheetId) {
    var result;
    Ext.Ajax.request({
        url: 'api/StkNoOrderStockOut/VerStockOutData',
        jsonData: { paramValue: sheetId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}
//#endregion

/**
 * 对生效处理
 * @param {Array} records 
 * @param {String} progId
 */
function ReleaseFunc(records, progId) {
    var bState = false;
    var batchParams = "";
    var currentState = 0;
    if (records.length > 1) {
        Ext.Msg.alert("提示", "只能选择一条数据");
    }
    else if (records.length > 0) {
        batchParams = records[0].get("SheetId");
        currentState = records[0].get("CURRENTSTATE");

        bState = true;
    }
    else {
        Ext.Msg.alert("提示", "未选择数据");
    }
    if (bState) {
        if (currentState == 1 || currentState == "1") {
            var info = [];
            info.push({ NoticeId: batchParams });
            if (progId == "stk.ReturnGoodsNotice") {
                Ax.utils.LibVclSystemUtils.openDataFunc("stk.ReturnGoodsSelPersonFunc", "选择处理人", [this, info, function () { getBillListing(); }]);
            }
            else {
                Ax.utils.LibVclSystemUtils.openDataFunc("stk.CheckClothApplyPersonFunc", "选择处理人", [this, info, function () { getBillListing(); }]);
            }
        }
        else if (currentState == 2 || currentState == "2") {
            Ext.Msg.alert("提示", "该单据已生效");
        }
        else {
            Ext.Msg.alert("提示", "单据只有在未生效状态才能进行生效");
        }
    }
}

//判断调拨申请情况
function SaleOrderAllocationApply(batchParams, funcName) {
    var result;
    Ext.Ajax.request({
        url: 'api/saleorder/AllocationApply',
        jsonData: { progId: 'sal.SaleOrderJF', saleOrderList: batchParams, personId: Ext.util.Cookies.get("loginPersonId") },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result.Success) {
                funcName();
            }
            else {
                var enttity = result.Enttity;

                if (enttity.WaitAudit != null && enttity.WaitAudit.length > 0) {
                    Ext.Msg.alert("提示", "订单：" + enttity.WaitAudit + " 提交的调拨申请还未审核，等待审核后才能进行订单送审");
                }
                else if (enttity.NoAudit != null && enttity.NoAudit.length > 0) {
                    Ext.Msg.alert("提示", "订单：" + enttity.WaitAudit + " 提交的调拨申请不通过，请重新选择调拨信息");
                }
                else if (enttity.NoExistBarCode != null && enttity.NoExistBarCode.length > 0) {
                    Ext.Msg.alert("提示", "条码：" + enttity.NoExistBarCode + " 仓库中不存在");
                }
                //else if (enttity.NoAudit != null && enttity.NoAudit.length > 0) {
                //    Ext.Msg.confirm('提示', '订单：' + enttity.NoAudit + '提交的调拨申请 未通过，您确定还要 送审 销售订单吗？', function (btn) {
                //        if (btn === 'yes') {
                //            funcName();
                //        }
                //    });
                //}
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}

//判断合同框架是否到期
function VelFrameworkContract(batchParams, funcName) {
    var result;
    Ext.Ajax.request({
        url: 'api/saleorder/VelFrameworkContract',
        jsonData: { progId: 'sal.SaleOrderJF', saleOrderList: batchParams, personId: Ext.util.Cookies.get("loginPersonId") },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result.Success) {
                funcName();
            }
            else {
                var orderIds = result.Message;

                Ext.Msg.confirm('提示', '客户：' + orderIds + ' 的框架合同已到期，您确定还提交送审吗？', function (btn) {
                    if (btn === 'yes') {
                        funcName();
                    }
                });
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}

/**
 * 销售订单送审时判断
 * @param {any} orderId
 * @param {any} funcName
 */
function VelProductSheetsign(orderId, funcName) {
    var result;
    Ext.Ajax.request({
        url: 'api/saleorder/VelProductSheetsign',
        jsonData: { paramValue: orderId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result.Success) {
                funcName();
            }
            else {
                var orderIds = result.Message;

                Ext.Msg.confirm('提示', result.Message, function (btn) {
                    if (btn === 'yes') {
                        funcName();
                    }
                });
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}


/**
* 
* 货运管理送审判断的
* 
* */
function GoodsTrafficSubmit(gridPanel) {
    var batchParams = [];
    var records = gridPanel.getView().getSelectionModel().getSelection();

    if (records.length > 0) {
        for (var v = 0; v < records.length; v++) {
            batchParams.push(records[v].get("SHEETID"));
        }
        return GoodsTrafficSubmitFunc(batchParams);
    }
    else {
        Ext.Msg.alert("提示", "请选择货运管理信息");
    }
    return result;
}

//货运管理送审判断调用接口
function GoodsTrafficSubmitFunc(batchParams) {
    var result;
    Ext.Ajax.request({
        url: 'api/goodstraffic/velamount',
        jsonData: { progId: 'stk.GoodsTraffic', objIds: batchParams, personId: Ext.util.Cookies.get("loginPersonId") },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}

/**
 * 显示物流公司
 * */
function showLogisticsCompanyWin(fn, stockOutSheetId) {

    var logisticsCompanyData = [];
    Ext.Ajax.request({
        url: 'api/goodstraffic/getlogisticscompany',
        jsonData: { progId: 'stk.GoodsTraffic', objIds: 0 },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Total > 0) {
                for (var i = 0; i < result.Total; i++) {
                    var info = result.Entities[i];
                    logisticsCompanyData.push([info.LOGISTICSCOMPANYID, info.LOGISTICSCOMPANYNAME]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });

    var showLogisticsCompany = new Ext.data.SimpleStore({
        fields: ['id', 'value'],
        data: logisticsCompanyData

    });

    var logisticsCompanyCmb = new Ext.form.ComboBox({
        editable: false,
        triggerAction: 'all',
        fieldLabel: '<font color="red">*</font>物流公司',
        store: showLogisticsCompany,
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'type',
        mode: 'local',
        anchor: '90%',
        value: '',
        allowBlank: false
    })

    var okbtn = new Ext.Button({
        text: '确定',
        class: 'fa fa-file-zip-o',
        handler: function () {

            addGoodsTraffic(logisticsCompanyCmb.getValue(), logisticsCompanyCmb.getRawValue(), stockOutSheetId);

            fn.call(this);
            insert_Win.close();
        }
    });

    /**
     * 新增物流
     * @param {any} logisticsCompanyId：物流公司ID
     * @param {any} logisticsCompanyName：物流公司名称
     * @param {any} stockOutSheetId：出库单编码
     */
    var addGoodsTraffic = function (logisticsCompanyId, logisticsCompanyName, stockOutSheetId) {
        Ext.Ajax.request({
            url: 'api/finishproductstock/updatestockoutlogisticscompany',
            jsonData: { progId: 'stk.GoodsTraffic', logisticsCompanyId: logisticsCompanyId, logisticsCompanyName: logisticsCompanyName, SHEETID: stockOutSheetId, personId: Ext.util.Cookies.get("loginPersonId") },
            method: 'POST',
            async: false,
            timeout: 90000000,
            success: function (response) {
                result = Ext.decode(response.responseText);
            },
            failure: function (response) {
                Ext.Msg.alert("提示", "方法调用失败");
            }
        });
    }

    var insert_Win = new Ext.Window({
        plain: true,
        layout: 'form',
        resizable: false, // 改变大小
        draggable: true, // 不允许拖动
        closeAction: 'hide',// 可被关闭 close or hide
        modal: true, // 模态窗口
        width: 400,
        height: 150,
        title: '选择物流公司',
        items: [logisticsCompanyCmb],
        autoScroll: true,
        buttonAlign: 'center',
        loadMask: true,
        tbar: [okbtn]
    });
    insert_Win.show();
}
/**********************************弹出新窗口**********************************/
/**
 * 弹出新窗口
 * @param {String}url 读取数据和显示列的接口
 * @param {Array}filedWidth 特殊行显示宽度处理，如： var filedWidth = [{ filed: "MaterialId", width: 180 }];
 * @param {JSON}jsonQuery 接口查询条件，如：{ planNo: billId,objType: 0 }
 * @param {String}winTitle 窗口标题
 * @param {Function} totalFunc 读取合计数据的方法
 * @param {Number} defaultWidth 默认长度
 */
var CreateNewExtWin = function (url, filedWidth, jsonQuery, winTitle, totalFunc, defaultWidth) {
    if (defaultWidth == null || typeof (defaultWidth) == "undefined" || defaultWidth == 0 || defaultWidth == "0" || defaultWidth == "") {
        defaultWidth = 100;
    }
    var storeFields = [];
    var storeData = [];
    var gridColumns = [new Ext.grid.RowNumberer({
        header: "序号",
        width: 60
    })];
    Ext.Ajax.request({
        url: url,
        jsonData: jsonQuery,
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (result != null && result.Enttity != null) {
                if (result.Enttity.filedInfo != null && result.Enttity.filedInfo.length > 0) {
                    result.Enttity.filedInfo.forEach(function (item, index) {
                        storeFields.push({ name: item.filedId, type: 'string' });
                        gridColumns.push({ text: item.filedTitle, dataIndex: item.filedId, width: getWidth(filedWidth, item.filedId) });
                    });
                }
                if (result.Enttity.list != null && result.Enttity.list.length > 0) {
                    storeData = result.Enttity.list;
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });

    /**
   * 得到长度
   * @@param {Array} filedWidth 特殊列设置
   * @param {string} filedId 列
   */
    function getWidth(filedWidth, filedId) {
        var width = defaultWidth;
        $.each(filedWidth, function (i, item) {
            if (item.filed == filedId) {
                width = item.width;
            }
        });

        return width;
    }
    /**
      * 安排数量 合计显示文字
      * @param {Array}storeData 数据列表
      */
    function getQuantity(storeData) {
        if (totalFunc == null) {
            return "";
        }
        return totalFunc(storeData);
    }
    function execute_win() {
        function newWin() {         //自定义创建窗口函数;
            var id = 1;
            var win = new Ext.Window({  //创建窗口;
                layout: 'border',
                headerPosition: 'top',   //窗口标题的方位;
                title: winTitle,
                width: document.body.clientWidth * 0.7,
                height: document.body.clientHeight * 0.7,
                maximizable: true,        //窗口最大化;
                items: [grid]
            });
            win.show();
        };

        var storeLogTmp = Ext.create("Ext.data.Store", {
            fields: storeFields,
            data: storeData
        });

        var grid = Ext.create("Ext.grid.Panel", {
            region: 'center',
            flex: 1,
            store: storeLogTmp,
            collapsible: false,
            margin: '6 2 2 2',
            columns: gridColumns,
            viewConfig: {
                enableTextSelection: true
            },
            bbar: [{
                xtype: "label",
                text: getQuantity(storeData)
            }]
        });
        newWin();
    }
    execute_win();
}

/***************************************打印标签****************************************/
//批量打印功能
var batchPrintFun = function (progId, batchParams, personId) {
    Ext.Ajax.request({
        url: 'api/printlabel/batchprintbybarcode',
        jsonData: { progId: progId, batchParams: batchParams, personId: personId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (result != null && result.Success) {
                //打印
                FunPrintLabel(result.Enttity.printContent, result.Enttity.labelType);
            }
            else {
                Ext.Msg.alert("提示", result.Message);
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

var PrintFinishProduct = function (barCode, serialNo, printId) {
    Ext.Ajax.request({
        url: 'api/printlabel/getprintbybarcode',
        jsonData: { SerialNo: serialNo, BarCode: barCode, PrintId: printId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);

            if (result != null && result.Success) {
                //打印
                FunPrintLabel(result.Enttity.printContent, result.Enttity.labelType);
            }
            else {
                Ext.Msg.alert("提示", result.Message);
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}



/**
 * *预览
 * @param {any} data
 */
var LabelView = function (customerId, labelType, orderCodeId, LabelFormatId) {
    Ext.Ajax.request({
        url: '/api/printlabel/getlabelview',
        jsonData: { customerId: customerId, labelType: labelType, orderCodeId: orderCodeId, LabelFormatId: LabelFormatId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);


            if (result != null && result.Success) {

                //打印
                FunPrintLabel(result.Enttity, labelType);
            }
            else {
                Ext.Msg.alert("提示", result.Message);
            }

            //  Ext.Msg.alert("提示", result.Message);
            //  getBillListing();
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

/**
 * 打印标签
 * @param {any} printhtml :标签内容
 */
var FunPrintLabel = function (printhtml, printType) {

    var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));

    var printList = printhtml.split("$$");
    for (var i = 0; i < printList.length; i++) {
        LODOP.PRINT_INIT();
        if (printType == "7" || printType == 7) {
            LODOP.SET_PRINT_PAGESIZE(2, 900, 1500);
        }
        else if (printType == "3" || printType == 3) {
            LODOP.SET_PRINT_PAGESIZE(3, 1000, 200);
        }
        else {
            LODOP.SET_PRINT_PAGESIZE(3, 1000, 200);
        }
        LODOP.SET_PRINT_STYLE("FontSize", 12);
        for (i = 0; i < printList.length; i++) {
            if (i > 1) {
                LODOP.NewPage();
            }
            LODOP.ADD_PRINT_TABLE(0, 0, '100%', '100%', printList[i]);
        }

        LODOP.PREVIEW();
    }

}

/**
 * 打印标签
 * @param {any} printhtml :标签内容
 */
var FunPrintLabelVIEW = function (printhtml) {

    var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));

    LODOP.ADD_PRINT_HTM(10, 15, 400, "100%", printhtml);
    LODOP.SET_PRINT_STYLE("FontSize", 10);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 2);//打印项在纸张中水平居中
    LODOP.SET_PRINT_STYLEA(0, "Vorient", 2);//打印项在纸张中垂直居中
    LODOP.SET_PRINT_PAGESIZE(1, 104, 130, ""); //1---纵(正)向打印  2---横向打印 SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)设定纸张大小
    LODOP.PREVIEW();
}

/**
 * 打印小标签
 * @param {any} printhtml：标签内容
 */
var SmallPrintLabel = function (printhtml) {
    var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
    var printList = printhtml.split("$$");
    for (var i = 0; i < printList.length; i++) {

        //LODOP.PRINT_INIT();
        //LODOP.SET_PRINT_PAGESIZE(3, 500, 50);
        //LODOP.SET_PRINT_STYLE("FontSize", 12);
        //LODOP.ADD_PRINT_TABLE(0, 0, '100%', '100%', printhtml);
        //LODOP.PREVIEW();

        LODOP.PRINT_INIT();
        LODOP.SET_PRINT_PAGESIZE(3, 500, 50);
        LODOP.SET_PRINT_STYLE("FontSize", 12);
        for (i = 0; i < printList.length; i++) {
            if (i > 1) {
                LODOP.NewPage();
            }
            LODOP.ADD_PRINT_TABLE(0, 0, '100%', '100%', printList[i]);
        }
        LODOP.PREVIEW();
    }
}

/**
 * 打印大标签（新的）2023.02.20
 * @param {any} paroductCode 产品编码（tryeId = 1： 流水号； typeId = 2：条码号）
 * @param {any} typeId tryeId = 1： 流水号； typeId = 2：条码号
 * @param {any} printId 打印机编码
 */
function bigLabelPrint(paroductCode, typeId, printId) {
    Ext.Ajax.request({
        url: 'api/printlabel/LabelPrint',
        jsonData: {
            SerialNo: typeId != 2 ? paroductCode : '', BarCode: typeId == 2 ? paroductCode : '', PrintId: printId, personName: Ext.util.Cookies.get("loginPersonName")
        },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (!result.Success) {
                Ext.Msg.alert("提示", result.Message);
            }
            else {

                //#region 原来的代码
                //var fileName = result.Enttity.LabelHtmlPath;
                //var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                //var hostUrl = window.location.host;

                //var printData = result.Enttity.PrinterInfo;

                //LODOP.SET_PRINTER_INDEX(printData.PrinterName);
                //LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", fileName);
                ////原先的2023.10.25
                ////LODOP.ADD_PRINT_BARCODE(120, 10, 160, 38, '128Auto', result.Enttity.PrintData.BARCODE);
                ////LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);

                //LODOP.ADD_PRINT_BARCODE(118, 15, 160, 48, '128B', result.Enttity.PrintData.BARCODE);
                //LODOP.SET_PRINT_PAGESIZE(printData.PrintMode, '100mm', '49mm');
                //LODOP.SET_PRINT_COPIES(printData.IntCopies);//指定份数
                ////LODOP.PREVIEW();

                //LODOP.PRINT();
                //#endregion

                var fileName = result.Enttity.LabelHtmlPath;
                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));

                var hostUrl = window.location.host;

                var printData = result.Enttity.PrinterInfo;
                var data = result.Enttity.PrintData;
                Ext.Ajax.request({
                    url: 'api/common/PingIp',
                    jsonData: {
                        paramValue: printData.Ip
                    },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        var printNum = -1;
                        if (!result.Success) {
                            var printNum = -1;
                        }
                        else {
                            var iPrinterCount = LODOP.GET_PRINTER_COUNT();
                            for (var i = 0; i < iPrinterCount; i++) {
                                var printName = LODOP.GET_PRINTER_NAME(i);
                                if (printName.indexOf(printData.PrinterName) >= 0) {
                                    printNum = i;
                                    break;
                                }
                            }
                        }
                        LODOP.SET_PRINTER_INDEXA(printNum);
                        LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", fileName);

                   /*     LODOP.ADD_PRINT_BARCODE(118, 15, 160, 48, '128B', data.BARCODE);*/
                        LODOP.SET_PRINT_PAGESIZE(printData.PrintMode, '100mm', '49mm');
                        LODOP.SET_PRINT_COPIES(printData.IntCopies);//指定份数
                        LODOP.PRINT();
                    },
                    failure: function (response) {
                        LODOP.SET_PRINTER_INDEXA(-1);
                        LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", fileName);

                     /*   LODOP.ADD_PRINT_BARCODE(118, 15, 160, 48, '128B', data.BARCODE);*/
                        LODOP.SET_PRINT_PAGESIZE(printData.PrintMode, '100mm', '49mm');
                        LODOP.SET_PRINT_COPIES(printData.IntCopies);//指定份数
                        LODOP.PRINT();
                    }
                });

            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

/**
 * 打印小标签（新的）2023.05.19
 * @param {any} serialNo 流水号
 */
function smallLabelPrint(serialNo) {
    Ext.Ajax.request({
        url: 'api/qccheckfinishproduct/GetSmallLabel',
        jsonData: {
            paramValue: serialNo
        },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (!result.Success) {
                Ext.Msg.alert("提示", "打印失败");
            }
            else {
                var fileName = result.Enttity.LabelHtmlPath;
                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                var hostUrl = window.location.host;

                var printData = result.Enttity.PrinterInfo;
                LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", fileName);
                LODOP.SET_PRINT_PAGESIZE(0, 0, 0);
                LODOP.SET_PRINT_COPIES(1);//指定份数
                //LODOP.PREVIEW();

                LODOP.PRINT();
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

/**
 * 打印 管内标签（新的）2023.06.05
 * @param {any} serialNo 流水号
 */
function inPipeLabelInfo(serialNo) {
    Ext.Ajax.request({
        url: 'api/qccheckfinishproduct/InPipeLabelInfo',
        jsonData: {
            paramValue: serialNo
        },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (!result.Success) {
                Ext.Msg.alert("提示", result.Message);
            }
            else {
                var fileName = "";
                if (result.Enttity.InPipeLabel == 1) {
                    fileName = result.Enttity.InTubeAHtml;
                }
                else {
                    fileName = result.Enttity.InTubeEHtml;
                }
                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                var hostUrl = window.location.host;

                var printData = result.Enttity.PrinterInfo;
                LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", fileName);
                LODOP.SET_PRINT_PAGESIZE(0, 0, 0);
                LODOP.SET_PRINT_COPIES(1);//指定份数
                //LODOP.PREVIEW();

                LODOP.PRINT();
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

/**
 * 打印外购单信息
 * @param {any} billNo 单据号
 */
function PrintOutSourcing(billNo) {
    Ext.Ajax.request({
        url: 'api/qcoutsourcet/PrintOutSourcing',
        jsonData: {
            paramValue: billNo
        },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (!result.Success) {
                Ext.Msg.alert("提示", "打印失败");
            }
            else {
                var fileName = result.Enttity;
                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));

                LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", fileName);
                LODOP.SET_PRINT_PAGESIZE(0, 0, 0);
                LODOP.SET_PRINT_COPIES(1);//指定份数
                LODOP.PREVIEW();

                //LODOP.PRINT();
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

/**
 * 打印外购到货单信息
 * @param {any} billNo 单据号
 */
function PrintOutSourcingArrival(billNo) {
    Ext.Ajax.request({
        url: 'api/qcoutsourcet/PrintOutSourcingArrival',
        jsonData: {
            paramValue: billNo
        },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (!result.Success) {
                Ext.Msg.alert("提示", "打印失败");
            }
            else {
                var fileName = result.Enttity;
                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));

                LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", fileName);
                LODOP.SET_PRINT_PAGESIZE(0, 0, 0);
                LODOP.SET_PRINT_COPIES(1);//指定份数
                LODOP.PREVIEW();

                //LODOP.PRINT();
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
}

/**
 * 上传
 * @param {string} obj 对象
 * @param {int} fileType 上传的文件类型（1：文件 2：图片）
 * @param {string} callbackFunc 回调方法
 * @param {string} objType 类型(如：FrameworkContract，GoodsTraffic)
 */
var fpFileUploadControl = function (obj, fileType, objType, callbackFunc) {
    var labelText = "图片";
    var uploadUrl = '/fileTranSvc/upLoadUserPicture';
    if (fileType == 1) {
        uploadUrl = '/fileTranSvc/upLoadFile';
        labelText = "文件";
    }
    /**
     * 上传控件
     * */
    var fpFileUpload = new Ext.FormPanel({
        frame: true,
        fileUpload: true,
        items: [
            {
                xtype: 'filefield',
                name: 'txtFile',
                fieldLabel: labelText,
                labelWidth: 40,
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择...'
            }
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '上传',
                handler: function () {
                    if (fpFileUpload.form.isValid()) {
                        fpFileUpload.form.submit({
                            method: 'post',
                            url: uploadUrl,
                            waitMsg: '文件上传中...',
                            success: function (fp, o) {
                                var fileName = o.result.FileName;
                                Ext.Ajax.request({
                                    url: 'api/UploadFile/moveUserFile',
                                    method: 'POST',
                                    jsonData: {
                                        fileName: fileName,
                                        fileType: fileType,
                                        typeId: objType
                                    },
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var ret = Ext.decode(response.responseText);
                                        if (ret.Success) {
                                            var v = callbackFunc(obj, ret.Result);
                                            if (obj != "saleOrder" && obj != "comCustomerProduct") {
                                                if (v != 0) {
                                                    Ext.Msg.alert('提示', '文件上传成功');
                                                }
                                            }
                                            winFielUpload.close();
                                        }
                                        else {
                                            Ext.Msg.alert('提示', '文件上传失败');
                                        }
                                    }
                                });
                            },
                            failure: function () {
                                Ext.Msg.alert("系统提示", "文件上传失败！");
                            }
                        });
                    } else {
                        Ext.Msg.alert("系统提示", "请选择文件后再上传！");
                    }
                }
            },
            {
                text: '取消',
                handler: function () {
                    winFielUpload.close();
                }
            }
        ]
    });

    var winFielUpload = new Ext.Window({
        title: '文件上传',
        width: 350,
        height: 130,
        layout: 'fit',
        autoDestory: true,
        modal: true,
        closeAction: 'hide',
        items: [
            fpFileUpload
        ]
    });

    winFielUpload.show();
}

var fpFileUploadControlExt = function (obj, fileType, objType, callbackFunc) {
    var labelText = "图片";
    var uploadUrl = '/fileTranSvc/upLoadUserPicture';
    if (fileType == 1) {
        uploadUrl = '/fileTranSvc/upLoadFile';
        labelText = "文件";
    }
    /**
     * 上传控件
     * */
    var fpFileUpload = new Ext.FormPanel({
        frame: true,
        fileUpload: true,
        items: [
            {
                xtype: 'filefield',
                name: 'txtFile',
                fieldLabel: labelText,
                labelWidth: 40,
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择...'
            }
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '上传',
                handler: function () {
                    if (fpFileUpload.form.isValid()) {
                        fpFileUpload.form.submit({
                            method: 'post',
                            url: uploadUrl,
                            waitMsg: '文件上传中...',
                            success: function (fp, o) {
                                var fileName = o.result.FileName;
                                Ext.Ajax.request({
                                    url: 'api/UploadFile/moveUserFile',
                                    method: 'POST',
                                    jsonData: {
                                        fileName: fileName,
                                        fileType: fileType,
                                        typeId: objType
                                    },
                                    async: false,
                                    timeout: 90000000,
                                    success: function (response) {
                                        var ret = Ext.decode(response.responseText);
                                        if (ret.Success) {
                                            callbackFunc(obj, ret.Result);
                                            winFielUpload.close();
                                        }
                                        else {
                                            Ext.Msg.alert('提示', '文件上传失败');
                                        }
                                    }
                                });
                            },
                            failure: function () {
                                Ext.Msg.alert("系统提示", "文件上传失败！");
                            }
                        });
                    } else {
                        Ext.Msg.alert("系统提示", "请选择文件后再上传！");
                    }
                }
            },
            {
                text: '取消',
                handler: function () {
                    winFielUpload.close();
                }
            }
        ]
    });

    var winFielUpload = new Ext.Window({
        title: '文件上传',
        width: 350,
        height: 150,
        layout: 'fit',
        constrainHeader: true,
        autoDestory: true,
        modal: true,
        closeAction: 'hide',
        items: [
            fpFileUpload
        ]
    });

    winFielUpload.show();
}

var fpMuiFileUploadExt = function (fileType, saveDirName, referId, serverUrl, parentBaseDeleteFlag, validUrl) {
    if (!fileType) {
        fileType = "";
    } else {
        fileType = encodeURI(fileType);
    }
    if (!referId) {
        referId = "";
    } else {

        referId = encodeURI(referId);
    }

    if (!saveDirName) {
        saveDirName = "";
    } else {
        saveDirName = encodeURI(saveDirName);
    }

    if (!serverUrl) {
        serverUrl = "";
    } else {
        serverUrl = encodeURI(serverUrl);
    }

    if (!validUrl) {
        validUrl = "";
    } else {
        validUrl = encodeURI(validUrl);
    }

    function closeWindow() {
        var iframe = document.getElementById('uploadIframe');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        //alert($(innerDoc).find("#uploadSrcValue").val());
    }

    var winFielUpload = new Ext.Window({
        title: '文件上传',
        width: document.body.clientWidth * 0.8,
        height: document.body.clientHeight * 0.8,
        layout: 'fit',
        constrainHeader: true,
        autoDestory: true,
        modal: true,
        closeAction: 'hide',
        listeners: { 'hide': { fn: closeWindow } },
        items: [new Ext.Panel({
            resizeTabs: true,
            autoScroll: false,
            html: '<iframe id="uploadIframe" scrolling="hidden" frameborder="0" width="100%" height="100%" src="/simpleUpload.html?parentBaseDeleteFlag=' + parentBaseDeleteFlag + '&fileType=' + fileType + '&referId=' + referId + '&saveDirName=' + saveDirName + '&serverUrl=' + serverUrl + '&validUrl=' + validUrl + '&r=' + new Date().getMilliseconds() + '"></iframe>'
        })],
    });

    winFielUpload.show();
}

//#region 销售订单修改权限
/**
 * 销售订单修改权限
 * @param {any} PersonId 登录人
 * @param {any} CodeId 订单编号
 */
var saleOrderEditPower = function (PersonId, CodeId) {
    var bResult = false;
    Ext.Ajax.request({
        url: 'api/saleorder/VelEditPower',
        jsonData: {
            PersonId: PersonId, CodeId: CodeId
        },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            bResult = result;
        },
        failure: function (response) {
        }
    });
    return bResult;
}
//#endregion


//#region 合计功能处理

//#region 合计字段是否显示
/**
 * 合计字段是否显示
 * @param {any} vTOTALFIELD 选择的合计字段
 * @param {any} totalHalfAccountDetailFieldArray 合计字段下拉框中的中文
 * @param {any} totalField 合计字段
 * @param {any} comObj 当前对象
 * @param {any} tableNum 合计表序号
 */
function CommonIsShowTotalField(comObj, vTOTALFIELD, totalHalfAccountDetailFieldArray, totalField, tableNum) {
    var totalFieldTitle = totalHalfAccountDetailFieldArray[vTOTALFIELD];

    var CURSELECTTOTALFIELD = comObj.dataSet.getTable(0).data.items[0].get("SELECTTOTALFIELD");
    if (("," + CURSELECTTOTALFIELD + ",").indexOf("," + totalFieldTitle + ",") < 0) {
        if (CURSELECTTOTALFIELD.length > 0) {
            CURSELECTTOTALFIELD = CURSELECTTOTALFIELD + "," + totalFieldTitle;
        }
        else {
            CURSELECTTOTALFIELD = totalFieldTitle;
        }
        comObj.dataSet.getTable(0).data.items[0].set("SELECTTOTALFIELD", CURSELECTTOTALFIELD);
        Ext.getCmp("SELECTTOTALFIELD0_" + comObj.winId).setValue(CURSELECTTOTALFIELD);
    }

    var productFields = comObj.dataSet.dataList[tableNum].ownGrid.columns;
    var showField = new Array();

    for (var i = 0; i < totalHalfAccountDetailFieldArray.length; i++) {
        if (("," + CURSELECTTOTALFIELD + ",").indexOf(("," + totalHalfAccountDetailFieldArray[i] + ",")) >= 0) {
            showField.push(totalField[i - 1]);
        }
    }
    for (var i = 0; i < productFields.length; i++) {
        if (("," + totalField + ",").indexOf(("," + productFields[i].dataIndex + ",")) >= 0) {

            if (("," + showField + ",").indexOf(("," + productFields[i].dataIndex + ",")) >= 0) {
                productFields[i].setVisible(true);
            }
            else {
                productFields[i].setVisible(false);
            }
        }
    }
}
//#endregion

//#region 清空合计字段
/**
 * 清空合计字段
 * @param {any} comObj 当前对象
 */
function CommonClearTotalField(comObj) {
    comObj.dataSet.getTable(0).data.items[0].set("SELECTTOTALFIELD", "");
    Ext.getCmp("SELECTTOTALFIELD0_" + comObj.winId).setValue("");

    comObj.dataSet.getTable(0).data.items[0].set("TOTALFIELD", "");
    Ext.getCmp("TOTALFIELD0_" + comObj.winId).setValue("");
}
//#endregion

//#region 绑定合计数据
/**
 * 绑定合计数据
 * @param {any} comObj 当前对象
 * @param {any} tableNum 要处理子表剩余第一个table(如：1,2,3)
 * @param {any} dataList 查询的数据
 */
function CommonBindTotal(comObj, tableNum, dataList) {
    Ext.suspendLayouts();//关闭Ext布局
    var curStore = comObj.dataSet.getTable(tableNum);
    curStore.suspendEvents();//关闭store事件
    try {
        var masterRow = comObj.dataSet.getTable(0).data.items[0];
        comObj.dataSet.getTable(tableNum).removeAll();
        //统计数据
        if (dataList != undefined && dataList.length > 0) {
            for (var i = 0; i < dataList.length; i++) {
                var info = dataList[i];
                var newRow = comObj.addRow(masterRow, tableNum);
                for (x in info) {
                    //字段跟返回值得属性要完全一致
                    newRow.set(x, info[x]);
                }
            }
        }
    } finally {
        curStore.resumeEvents();//打开store事件
        if (curStore.ownGrid && curStore.ownGrid.getView().store != null)
            curStore.ownGrid.reconfigure(curStore);
        Ext.resumeLayouts(true);//打开Ext布局
    }
}
//#endregion

//#endregion

//#region 给主表字段赋值
/**
 * 给主表字段赋值
 * @param {any} comObj 当前对象
 * @param {any} dataList 数据
 * @param {any} notNeedShowField 页面不呈现，但有要赋值
 * @param {any} selectField 下拉列表赋值
 * @param {any} notVoluationField 不需要复制的字段
 */
function CommonMasterTableField(comObj, notNeedShowField, dataList, notVoluationField) {
    var mRow = comObj.dataSet.getTable(0).data.items[0];
    var x;
    for (var x in dataList) {
        if (notVoluationField != null && notVoluationField.length > 0 && notVoluationField.indexOf(x) >= 0) {
            continue;
        }
        mRow.set(x, dataList[x]);
        if (notNeedShowField == null || notNeedShowField.length == 0 || notNeedShowField.indexOf(x) < 0) {
            Ext.getCmp(x + "0_" + comObj.winId).setValue(dataList[x]);
        }
    }
}
//#endregion

//#region 批量修改发货单
/**
 * 批量修改发货单
 * @param {any} selObjId 选中的单据
 * @param {any} personId 操作人
 * @param {any} personName 操作人姓名
 * @param {any} Commonfunc 成功后调用
 */
function BathGoodsTrafficFrom(selObjId, personId, personName, Commonfunc) {

    //#region 物流公司
    var logisticsCompanyData = [];
    Ext.Ajax.request({
        url: 'api/goodstraffic/getlogisticscompany',
        jsonData: { progId: 'stk.GoodsTraffic', objIds: 0 },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Total > 0) {
                for (var i = 0; i < result.Total; i++) {
                    var info = result.Entities[i];
                    logisticsCompanyData.push([info.LOGISTICSCOMPANYID, info.LOGISTICSCOMPANYNAME]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });

    var showLogisticsCompany = new Ext.data.SimpleStore({
        fields: ['id', 'value'],
        data: logisticsCompanyData
    });

    var logisticsCompanyCmb = new Ext.form.ComboBox({
        editable: false,
        triggerAction: 'all',
        fieldLabel: '物流公司',
        store: showLogisticsCompany,
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'LOGISTICSCOMPANYID',
        mode: 'local',
        anchor: '100%',
        value: '',
        allowBlank: false
    })
    //#endregion

    ////#region 价格类别

    //var priceClassData = [];
    //Ext.Ajax.request({
    //    url: 'api/goodstraffic/GetPriceClass',
    //    jsonData: {},
    //    method: 'POST',
    //    async: false,
    //    timeout: 90000000,
    //    success: function (response) {
    //        result = Ext.decode(response.responseText);
    //        if (result != null && result.Total > 0) {
    //            for (var i = 0; i < result.Total; i++) {
    //                var info = result.Entities[i];
    //                priceClassData.push([info.PriceClassId, info.PriceClassName]);
    //            }
    //        }
    //    },
    //    failure: function (response) {
    //        Ext.Msg.alert("提示", "方法调用失败");
    //    }
    //});

    //var showPrice = new Ext.data.SimpleStore({
    //    fields: ['id', 'value'],
    //    data: priceClassData
    //});

    //var PriceCmb = new Ext.form.ComboBox({
    //    editable: false,
    //    triggerAction: 'all',
    //    fieldLabel: '价格类别',
    //    store: showPrice,
    //    displayField: 'value',//显示下拉列表数据值
    //    valueField: 'id', //提交时下拉列表框的数据值
    //    name: 'PRICETYPEID',
    //    mode: 'local',
    //    anchor: '100%',
    //    value: '',
    //    allowBlank: false
    //})

    ////#endregion

    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: '目的港',
                name: 'ADDRESS'
            },
            {
                xtype: 'textfield',
                fieldLabel: '集装箱号',
                name: 'ContainerNum'
            },
            {
                xtype: 'textfield',
                fieldLabel: '提单号',
                name: 'BillNum'
            },
            {
                xtype: 'textfield',
                fieldLabel: '货运负责人',
                name: 'FREIGHTPRINCIPAL'
            },
            //{
            //    xtype: 'textfield',
            //    fieldLabel: '出口日期',
            //    name: 'ExportDate'
            //},
            //logisticsCompanyCmb,
            //PriceCmb
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {

                    var ADDRESS = form.getForm().findField('ADDRESS').getValue();
                    var ContainerNum = form.getForm().findField('ContainerNum').getValue();
                    var BillNum = form.getForm().findField('BillNum').getValue();
                    var FREIGHTPRINCIPAL = form.getForm().findField('FREIGHTPRINCIPAL').getValue();
                    var LOGISTICSCOMPANYID = form.getForm().findField('LOGISTICSCOMPANYID').getValue();
                    var logisticsCompanyName = form.getForm().findField('LOGISTICSCOMPANYID').getRawValue();

                    Ext.Ajax.request({
                        url: 'api/goodstraffic/BathEditGoodsTraffic',
                        jsonData: {
                            Address: ADDRESS, ContainerNum: ContainerNum, BillNum: BillNum, FREIGHTPRINCIPAL: FREIGHTPRINCIPAL,
                            LOGISTICSCOMPANYID: LOGISTICSCOMPANYID, logisticsCompanyName: logisticsCompanyName,
                            personId: personId, personName: personName, selIds: selObjId
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            result = Ext.decode(response.responseText);
                            if (result.Success) {
                                Commonfunc();
                                Ext.Msg.alert("提示", "操作成功！");
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                            win.close(this);
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    })


                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "批量修改",       //标题
        draggable: false,
        height: 300,                          //高度
        width: 400,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}
//#endregion

//#region 发货单明细数据初始化
/**
 * 发货单明细数据
 * @param {any} allItems 明细数据
 * @param {any} masterDETAILRow 主表
 * @param {any} obj 对象
 */
function stkGoodsTrafficProductInfoDefault(allItems, masterDETAILRow, obj) {
    var productArr = [];
    for (var i = 0; i < allItems.length; i++) {
        if (productArr.length == 0) {
            productArr.push({
                AfterWayRouteName: allItems[i].get("AFTERWAYROUTENAME"),
                AfterWayRouteId: allItems[i].get("AFTERWAYROUTEID"),
                Unit: allItems[i].get("UNIT"),
                OrderId: allItems[i].get("ORDERID"),
                CustomerOrderId: allItems[i].get("CUSTOMERORDERID"),
                ProductId: allItems[i].get("PRODUCTID"),
                CustomerProductId: allItems[i].get("CUSTOMERPRODUCTID"),
                CURRENCYTYPE: allItems[i].get("CURRENCYTYPE"),
                CURRENCYNAME: allItems[i].get("CURRENCYNAME"),

                Quantity: parseFloat(allItems[i].get("QUANTITY")).toFixed(1),
                Netyards: parseFloat(allItems[i].get("NETYARDS")).toFixed(1),
                GrossLength: parseFloat(allItems[i].get("GROSSLENGTH")).toFixed(1),

                GrossLengthCode: parseFloat(parseFloat(parseFloat(allItems[i].get("GROSSLENGTH")).toFixed(1)) * 1.0936).toFixed(1),

                RollNum: 1
            });
        }
        else {
            let b = productArr.some((m) => {
                if ((allItems[i].get("ORDERID") == m.OrderId) && (allItems[i].get("CUSTOMERORDERID") == m.CustomerOrderId)
                    && (allItems[i].get("PRODUCTID") == m.ProductId) && (allItems[i].get("CUSTOMERPRODUCTID") == m.CustomerProductId)
                    && (allItems[i].get("UNIT") == m.Unit) && (allItems[i].get("AFTERWAYROUTEID") == m.AfterWayRouteId)
                    && (allItems[i].get("AFTERWAYROUTENAME") == m.AfterWayRouteName
                        && allItems[i].get("CURRENCYTYPE") == m.CURRENCYTYPE
                        && allItems[i].get("CURRENCYNAME") == m.CURRENCYNAME)
                ) {
                    m.Quantity = (parseFloat(m.Quantity) + parseFloat(allItems[i].get("QUANTITY"))).toFixed(1);
                    m.Netyards = (parseFloat(m.Netyards) + parseFloat(allItems[i].get("NETYARDS"))).toFixed(1);
                    m.GrossLength = (parseFloat(m.GrossLength) + parseFloat(allItems[i].get("GROSSLENGTH"))).toFixed(1);
                    var grossLengthCode = parseFloat(parseFloat(parseFloat(allItems[i].get("GROSSLENGTH")).toFixed(1)) * 1.0936).toFixed(1);
                    m.GrossLengthCode = (parseFloat(m.GrossLengthCode) + parseFloat(grossLengthCode)).toFixed(1);

                    m.RollNum = m.RollNum + 1;
                    return true;
                }
                else {
                    return false;
                }
            });
            if (!b) {
                var grossLengthCode = parseFloat(parseFloat(parseFloat(allItems[i].get("GROSSLENGTH")).toFixed(1)) * 1.0936).toFixed(1);

                productArr.push({
                    AfterWayRouteName: allItems[i].get("AFTERWAYROUTENAME"),
                    AfterWayRouteId: allItems[i].get("AFTERWAYROUTEID"),
                    Unit: allItems[i].get("UNIT"),
                    OrderId: allItems[i].get("ORDERID"),
                    CustomerOrderId: allItems[i].get("CUSTOMERORDERID"),
                    ProductId: allItems[i].get("PRODUCTID"),
                    CustomerProductId: allItems[i].get("CUSTOMERPRODUCTID"),
                    CURRENCYTYPE: allItems[i].get("CURRENCYTYPE"),
                    CURRENCYNAME: allItems[i].get("CURRENCYNAME"),

                    Quantity: parseFloat(allItems[i].get("QUANTITY")).toFixed(1),
                    Netyards: parseFloat(allItems[i].get("NETYARDS")).toFixed(1),
                    GrossLength: parseFloat(allItems[i].get("GROSSLENGTH")).toFixed(1),
                    GrossLengthCode: parseFloat(grossLengthCode).toFixed(1),

                    RollNum: 1
                });
            }
        }
    }

    //初始化数据
    if (productArr.length > 0) {
        for (var i = 0; i < productArr.length; i++) {
            var newRow = obj.addRow(masterDETAILRow, 1);
            newRow.set("CUSTOMERORDERID", productArr[i].CustomerOrderId);
            newRow.set("ORDERID", productArr[i].OrderId);
            newRow.set("PRODUCTID", productArr[i].ProductId);
            newRow.set("POSTDISPOSALTYPENAME", productArr[i].AfterWayRouteName);
            newRow.set("UNIT", productArr[i].Unit);
            newRow.set("CURRENCYTYPE", productArr[i].CURRENCYTYPE);
            newRow.set("CURRENCYNAME", productArr[i].CURRENCYNAME);
            newRow.set("QUANTITY", productArr[i].GrossLength);
            newRow.set("NETYARDS", productArr[i].GrossLengthCode);

            newRow.set("QUANTITYCODE", productArr[i].Quantity);
            newRow.set("NETYARDSCODE", productArr[i].Netyards);
            newRow.set("QPROLLNUM", productArr[i].RollNum);

            newRow.set("REALQUANTITY", productArr[i].Quantity);
            newRow.set("REALNETYARDS", productArr[i].Netyards);
            newRow.set("REALQPROLLNUM", productArr[i].RollNum);
            newRow.set("REALGROSSLENGTH", productArr[i].GrossLength);
            newRow.set("REALGROSSYARDS", productArr[i].GrossLengthCode);
        }
    }

}
//#endregion

//#region 批量复制产品工艺
/**
 * 批量复制产品工艺
 * @param {any} productId 选中的单据
 * @param {any} patternId 选中的单据
 * @param {any} Commonfunc 成功后调用
 */
function BatchCopyProductCraftFrom(productId, patternId, Commonfunc) {

    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: '产品型号',
                name: 'PRODUCTID',
                readOnly: true,
                value: productId
            },
            {
                xtype: 'textfield',
                fieldLabel: '花型编号',
                name: 'PATTERNID',
                readOnly: true,
                value: patternId
            },
            {
                xtype: 'textfield',
                fieldLabel: '色    号',
                name: 'STARTVALUE'
            },
            {
                xtype: 'textfield',
                fieldLabel: '      至',
                name: 'ENDVALUE'
            }
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {

                    var PRODUCTID = form.getForm().findField('PRODUCTID').getValue();
                    var PATTERNID = form.getForm().findField('PATTERNID').getValue();
                    var STARTVALUE = form.getForm().findField('STARTVALUE').getValue();
                    var ENDVALUE = form.getForm().findField('ENDVALUE').getValue();
                    var PERSONID = Ext.util.Cookies.get("loginPersonId");
                    Ext.Ajax.request({
                        url: 'api/DsProduct/BatchCopyProductCraft',
                        jsonData: {
                            ProductId: PRODUCTID, PatterId: PATTERNID, StartValue: STARTVALUE, EndValue: ENDVALUE, PersonId: PERSONID
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            result = Ext.decode(response.responseText);
                            if (result.Success) {
                                Commonfunc();
                                Ext.Msg.alert("提示", "操作成功！");
                                win.close(this);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    })
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "批量复制",       //标题
        draggable: false,
        height: 260,                          //高度
        width: 400,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}
//#endregion

//#region 批量修改供应商(染色需求表和并色需求表)
/**
 * 批量修改供应商(染色需求和并色需求表)
 * @param {any} billNOs 选中的单据
 * @param {any} progId 选中的单据
 * @param {any} Commonfunc 成功后调用
 */
function BatchModifySupplierFrom(billNOs, progId, Commonfunc) {

    var supplierClassData = [];
    //#region 供应商
    Ext.Ajax.request({
        url: 'api/SupplyManagement/GetSupplierData',
        jsonData: { paramValue: progId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Total > 0) {
                for (var i = 0; i < result.Total; i++) {
                    var info = result.Entities[i];
                    supplierClassData.push([info.SUPPLIERID, info.SUPPLIERID + ',' + info.SUPPLIERNAME]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    //#endregion

    var SupplierCmb = new Ext.form.ComboBox({
        editable: true,
        triggerAction: 'all',
        fieldLabel: '供应商',
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'SUPPLIERID',
        mode: 'local',
        anchor: '100%',
        width: 60,
        allowBlank: false,
        store: {
            fields: ['id', 'value'],
            data: supplierClassData
        },
        queryDelay: 300,
        listeners: {
            'beforequery': function (e) {
                var combo = this,
                    size = 15,
                    idx = 1;
                combo.expand();
                if (e.query === '' || e.query == null) {//当输入框删除内容后，清除过滤器，
                    //显示原本store数据,使其能够再次检索
                    combo.store.clearFilter();
                }
                else {
                    if (!e.forceAll) {
                        var input = e.query;
                        // 检索的正则
                        var regExp = new RegExp(".*" + input + ".*", "i");
                        // 执行检索
                        combo.store.filterBy(function (record, id) {
                            //if (idx > size) {
                            //    return false;
                            //}
                            var text = record.get(combo.displayField);
                            var flag = regExp.test(text);
                            if (flag) {
                                idx++;
                            }
                            return flag;
                        });
                        return false;
                    }
                }
            }
        }
    })
    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            SupplierCmb
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {
                    var SUPPLIERID = form.getForm().findField("SUPPLIERID").getValue();

                    Ext.Ajax.request({
                        url: 'api/SupplyManagement/BatchModifySupplier',
                        jsonData: {
                            BillNOs: billNOs, progId: progId, SupplierId: SUPPLIERID
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            result = Ext.decode(response.responseText);
                            if (result.Success) {
                                Commonfunc();
                                Ext.Msg.alert("提示", "操作成功！");
                                win.close(this);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    })
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "批量修改供应商",       //标题
        draggable: false,
        height: 120,                          //高度
        width: 300,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}
//#endregion

//#region 修改子表，明细随着改变Js
/**
 * 修改子表，明细随着改变Js
 * @param {any} obj 对象
 * @param {any} array 明细子表数据
 * @param {any} keyArray 分组字段（明细、跟子表 字段名称要一致）
 * @param {any} totalArray 合计字段（明细、跟子表 字段名称要一致）
 * @param {any} countArray 个数字段
 * @param {any} infoTableNum 明细为第几张表
 */
function CommonSubTabelGroupingToArray(obj, array, keyArray, totalArray, countArray, infoTableNum) {
    var resKey = 'list';

    if (keyArray.length <= 0) return array;
    var aMap = [];
    var aResult = [];
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        var repetitionValue = '';
        var repetitionKey = 'Key';
        keyArray.forEach((keyValue) => {
            if (repetitionValue.length > 0) {
                repetitionValue += '##';
            }
            repetitionValue += item.get(keyValue);
        });
        if (aMap.indexOf(repetitionValue) === -1) {
            var oItem = {};
            oItem[resKey] = [];
            //统计值
            for (var m = 0; m < totalArray.length; m++) {
                oItem[resKey][totalArray[m]] = item.get(totalArray[m]);
            }
            //个数
            for (var m = 0; m < countArray.length; m++) {
                oItem[resKey][countArray[m]] = 1;
            }
            //oItem[resKey] = { quantity: item.get("QUANTITY"), rollNum: 1 };

            oItem[repetitionKey] = repetitionValue;
            aResult.push(oItem);
            aMap.push(repetitionValue);
        } else {
            var index = aMap.indexOf(repetitionValue);
            //统计值
            for (var m = 0; m < totalArray.length; m++) {
                aResult[index][resKey][totalArray[m]] = (parseFloat(aResult[index][resKey][totalArray[m]]) + parseFloat(item.get([totalArray[m]]))).toFixed(1);
            }
            //个数
            for (var m = 0; m < countArray.length; m++) {
                aResult[index][resKey][countArray[m]] = parseInt(aResult[index][resKey][countArray[m]]) + 1;
            }
        }
    }
    CommonDefaultGroupTabelData(obj, aResult, infoTableNum, keyArray, totalArray, countArray);
}

/**
 * 初始数据
 * @param {any} obj 对象
 * @param {any} productList 明细数据
 * @param {any} tableNum  明细为第几张表
 * @param {any} keyArray 分组字段（明细、跟子表 字段名称要一致）
 * @param {any} totalArray 合计字段（明细、跟子表 字段名称要一致）
 * @param {any} countArray 个数字段
 */
function CommonDefaultGroupTabelData(obj, productList, tableNum, keyArray, totalArray, countArray) {
    var infoTabel = obj.dataSet.getTable(tableNum).data.items;
    var masterRow = obj.dataSet.getTable(0).data.items[0];

    var existProduct = [];
    var deleteProduct = [];
    for (var i = 0; i < infoTabel.length; i++) {
        var b = false;
        for (var m = 0; m < productList.length; m++) {
            var key = "";
            for (var n = 0; n < keyArray.length; n++) {
                key += infoTabel[i].get(keyArray[n]);
                if (n < keyArray.length - 1) {
                    key += "##";
                }
            }

            if ((key) == productList[m].Key) {
                for (var n = 0; n < totalArray.length; n++) {
                    infoTabel[i].set(totalArray[n], productList[m].list[totalArray[n]]);
                }
                for (var n = 0; n < countArray.length; n++) {
                    infoTabel[i].set(countArray[n], productList[m].list[countArray[n]]);
                }

                existProduct.push(productList[m].Key);
                b = true;
                break;
            }
        }
        if (!b) {
            deleteProduct.push(i);
        }
    }

    if (deleteProduct.length > 0) {
        obj.dataSet.getTable(tableNum).removeAll();
        existProduct = [];
    }
    for (var i = 0; i < productList.length; i++) {
        var b = false;
        var info = productList[i];
        for (var m = 0; m < existProduct.length; m++) {
            if (info.Key == existProduct[m]) {
                b = true;
                break;
            }
        }
        if (b) {
            continue;
        }
        var newRow = obj.addRow(masterRow, tableNum);

        var orderInfo = info.Key.split("##");
        for (var n = 0; n < keyArray.length; n++) {
            infoTabel[i].set(keyArray[n], orderInfo[n]);
        }
        for (var n = 0; n < totalArray.length; n++) {
            infoTabel[i].set(totalArray[n], info.list[totalArray[n]]);
        }
        for (var n = 0; n < countArray.length; n++) {
            infoTabel[i].set(countArray[n], info.list[countArray[n]]);
        }
    }
}
//#endregion

//#region 米转码
/**
 * 米转码
 * @param {any} m 米
 */
function mToCode(m) {
    return (parseFloat(m) * 1.0936).toFixed(1);
}
//#endregion

//#region 码转米
/**
 * 码转米
 * @param {any} code 码
 */
function codeToM(code) {
    return (parseFloat(code) * 0.9144).toFixed(1);
}
//#endregion

//#region 给主表的字段赋值
/**
 * 给主表的字段赋值
 * @param {any} obj
 * @param {any} feildName
 * @param {any} feildValue
 */
function CommonMainTableFeild(obj, feildName, feildValue) {
    obj.dataSet.dataList[0].data.items[0].set(feildName, feildValue);
    Ext.getCmp(feildName + "0_" + obj.winId).setValue(feildValue);
}
//#endregion

//#region 给下拉列表框增加默认数据
/**
 * 给下拉列表框增加默认数据
 * @param {any} feildName 控件
 * @param {any} feildIdValue  ID值
 * @param {any} feildNameValue Name值
 */
function InsertDropDownData(obj, feildName, feildIdValue, feildNameValue) {
    Ext.getCmp(feildName + "0_" + obj.winId).store.insert(0, {
        Id: feildIdValue,
        Name: feildNameValue
    });
    Ext.getCmp(feildName + "0_" + obj.winId).setValue(feildIdValue);
}
//#endregion

//#region 批量修改后整理路线(产品属性)
/**
 * 批量修改后整理路线(产品属性)
 * @param {any} billNOs 选中的单据
 * @param {any} progId 选中的单据
 * @param {any} Commonfunc 成功后调用
 */
function BatchModifyAfterWayRouteFrom(PRODUCTATTRIDs, progId, Commonfunc) {

    var AfterWayRouteClassData = [];
    //#region 后整理路线
    Ext.Ajax.request({
        url: 'api/afterwaymanagement/getafterwayfulldata',
        jsonData: { paramValue: progId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Total > 0) {
                for (var i = 0; i < result.Total; i++) {
                    var info = result.Entities[i];
                    AfterWayRouteClassData.push([info.AFTERWAYROUTEID, info.AFTERWAYROUTEID + ',' + info.AFTERWAYROUTENAME]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    //#endregion

    var AfterWayRouteCmb = new Ext.form.ComboBox({
        editable: true,
        triggerAction: 'all',
        fieldLabel: '后整理路线',
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'AFTERWAYROUTEID',
        mode: 'local',
        anchor: '100%',
        width: 60,
        allowBlank: false,
        //lazyInit="false",
        store: {
            fields: ['id', 'value'],
            data: AfterWayRouteClassData
        },
        queryDelay: 500,//查询延时，毫秒
        listeners: {
            'beforequery': function (e) {
                var combo = this,
                    size = 15,
                    idx = 1;
                combo.expand();
                if (e.query === '' || e.query == null) {//当输入框删除内容后，清除过滤器，
                    //显示原本store数据,使其能够再次检索
                    combo.store.clearFilter();
                }
                else {
                    if (!e.forceAll) {
                        var input = e.query;
                        // 检索的正则
                        var regExp = new RegExp(".*" + input + ".*", "i");
                        // 执行检索
                        combo.store.filterBy(function (record, id) {
                            //if (idx > size) {
                            //    return false;
                            //}
                            var text = record.get(combo.displayField);
                            var flag = regExp.test(text);
                            if (flag) {
                                idx++;
                            }
                            return flag;
                        });
                        return false;
                    }
                }
            }
        }
    })
    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            AfterWayRouteCmb
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {
                    var AFTERWAYROUTEID = form.getForm().findField("AFTERWAYROUTEID").getValue();

                    Ext.Ajax.request({
                        url: 'api/afterwaymanagement/BatchModifyAfterWay',
                        jsonData: {
                            PRODUCTATTRIDs: PRODUCTATTRIDs, AFTERWAYROUTEID: AFTERWAYROUTEID
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            result = Ext.decode(response.responseText);
                            if (result.Success) {
                                Commonfunc();
                                Ext.Msg.alert("提示", "操作成功！");
                                win.close(this);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    })
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "批量修改后整理路线",       //标题
        draggable: false,
        height: 120,                          //高度
        width: 300,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}
//#endregion


//#region 加捻/并线单判断排色单是否完成
/**
 * 加捻/并线单判断排色单是否完成
 * @param {any} BILLNO 选中的信息
 */
function VelDyeISFINISH(BILLNO) {
    var result;
    Ext.Ajax.request({
        url: 'api/supplierplatform/VelDyeISFINISH',
        jsonData: { paramValue: BILLNO },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    return result;
}
//#endregion


//#region 批量修改花型编码(产品工艺)
/**
 * 批量修改花型编码(产品工艺)
 * @param {any} billNOs 选中的单据
 * @param {any} progId 选中的单据
 * @param {any} Commonfunc 成功后调用
 */
function BatchModifyFlowerCraftFrom(PRODUCTIDs, progId, Commonfunc) {

    var FlowerCraftClassData = [];
    //#region 花型工艺
    Ext.Ajax.request({
        url: 'api/ComFlowerCraft/getFlowerCraftFullData',
        jsonData: { paramValue: progId },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Total > 0) {
                for (var i = 0; i < result.Total; i++) {
                    var info = result.Entities[i];
                    FlowerCraftClassData.push([info.FLOWERCRAFTID, info.FLOWERCRAFTID + ',' + info.FLOWERCRAFTNAME]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    //#endregion

    var AfterWayRouteCmb = new Ext.form.ComboBox({
        editable: true,
        triggerAction: 'all',
        fieldLabel: '花型工艺',
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'FLOWERCRAFTID',
        mode: 'local',
        anchor: '100%',
        width: 60,
        allowBlank: false,
        //lazyInit="false",
        store: {
            fields: ['id', 'value'],
            data: FlowerCraftClassData
        },
        queryDelay: 500,//查询延时，毫秒
        listeners: {
            'beforequery': function (e) {
                var combo = this,
                    size = 15,
                    idx = 1;
                combo.expand();
                if (e.query === '' || e.query == null) {//当输入框删除内容后，清除过滤器，
                    //显示原本store数据,使其能够再次检索
                    combo.store.clearFilter();
                }
                else {
                    if (!e.forceAll) {
                        var input = e.query;
                        // 检索的正则
                        var regExp = new RegExp(".*" + input + ".*", "i");
                        // 执行检索
                        combo.store.filterBy(function (record, id) {
                            //if (idx > size) {
                            //    return false;
                            //}
                            var text = record.get(combo.displayField);
                            var flag = regExp.test(text);
                            if (flag) {
                                idx++;
                            }
                            return flag;
                        });
                        return false;
                    }
                }
            }
        }
    })
    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            AfterWayRouteCmb
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {
                    var FLOWERCRAFTID = form.getForm().findField("FLOWERCRAFTID").getValue();

                    Ext.Ajax.request({
                        url: 'api/ComFlowerCraft/batchModifyFlowerCraft',
                        jsonData: {
                            PRODUCTIDs: PRODUCTIDs, FLOWERCRAFTID: FLOWERCRAFTID
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            result = Ext.decode(response.responseText);
                            if (result.Success) {
                                Commonfunc();
                                Ext.Msg.alert("提示", "操作成功！");
                                win.close(this);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    })
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "批量修改花型",       //标题
        draggable: false,
        height: 120,                          //高度
        width: 300,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}
//#endregion

//#region 流水号打印单行设置
/**
 * 流水号打印单行设置
 * @param {any} lineHeight 行高
 * @param {any} textAlign 对齐方式
 * @param {any} fontSize 字体
 * @param {any} value 显示的值
 */
function SetPrintTR(Height, textAlign, padding, fontSize, value) {
    var returnValue = "";
    if (Height && textAlign && fontSize) {
        if (padding) {
            returnValue = "<tr style='height: " + Height + ";'>" +
                "    <td style = 'text-align:" + textAlign + ";" + padding + "font-size:" + fontSize + ";'>" + value + "</td>" +
                "</tr>";
        }
        else {
            returnValue = "<tr style='height: " + Height + ";'>" +
                "    <td style = 'text-align:" + textAlign + ";font-size:" + fontSize + ";'>" + value + "</td>" +
                "</tr>";
        }
    }
    return returnValue;

}
//#endregion

//#region 批量修改缸号
/**
 * 批量修改缸号
 * @param {any} billNo 选中的单据
 * @param {any} waveNo 任务书号
 * @param {any} Commonfunc 成功后调用
 */
function BatchModifySubbacthNoForm(billNo, weavNo, Commonfunc) {
    var StartSerialNoData = [];
    var EndSerialNoData = [];
    var SUBBATCHNO;
    //流水号
    Ext.Ajax.request({
        url: 'api/planmanagement/getWeavSerialNoFullData',
        jsonData: { paramValue: billNo },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Total > 0) {
                for (var i = 0; i < result.Total; i++) {
                    var info = result.Entities[i];
                    StartSerialNoData.push([info.SerialNo, info.SerialNo]);
                    EndSerialNoData.push([info.SerialNo, info.SerialNo]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });

    var StartSerialNoCmb = new Ext.form.ComboBox({
        editable: true,
        triggerAction: 'all',
        fieldLabel: '流 水 号',
        displayField: 'value',
        valueField: 'id',
        name: 'StartSerialNo',
        mode: 'local',
        anchor: '100%',
        width: 60,
        allowBlank: false,
        store: {
            fields: ['id', 'value'],
            data: StartSerialNoData
        },
        queryDelay: 300,
        listeners: {
            'beforequery': function (e) {
                var combo = this,
                    size = 15,
                    idx = 1;
                combo.expand();
                if (e.query === '' || e.query == null) {//当输入框删除内容后，清除过滤器，
                    //显示原本store数据,使其能够再次检索
                    combo.store.clearFilter();
                }
                else {
                    if (!e.forceAll) {
                        var input = e.query;
                        // 检索的正则
                        var regExp = new RegExp(".*" + input + ".*");
                        // 执行检索
                        combo.store.filterBy(function (record, id) {
                            //if (idx > size) {
                            //    return false;
                            //}
                            var text = record.get(combo.displayField);
                            var flag = regExp.test(text);
                            if (flag) {
                                idx++;
                            }
                            return flag;
                        });
                        return false;
                    }
                }
            }
        }
    })
    var EndSerialNoCmb = new Ext.form.ComboBox({
        editable: true,
        triggerAction: 'all',
        fieldLabel: '      至',
        displayField: 'value',
        valueField: 'id',
        name: 'EndSerialNo',
        mode: 'local',
        anchor: '100%',
        width: 60,
        allowBlank: false,
        store: {
            fields: ['id', 'value'],
            data: EndSerialNoData
        },
        queryDelay: 300,
        listeners: {
            'beforequery': function (e) {
                var combo = this,
                    size = 15,
                    idx = 1;
                combo.expand();
                if (e.query === '' || e.query == null) {//当输入框删除内容后，清除过滤器，
                    //显示原本store数据,使其能够再次检索
                    combo.store.clearFilter();
                }
                else {
                    if (!e.forceAll) {
                        var input = e.query;
                        // 检索的正则
                        var regExp = new RegExp(".*" + input + ".*");
                        // 执行检索
                        combo.store.filterBy(function (record, id) {
                            //if (idx > size) {
                            //    return false;
                            //}
                            var text = record.get(combo.displayField);
                            var flag = regExp.test(text);
                            if (flag) {
                                idx++;
                            }
                            return flag;
                        });
                        return false;
                    }
                }
            }
        }
    })
    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: '织造计划单据',
                name: 'BILLNO',
                readOnly: true,
                value: billNo
            },
            {
                xtype: 'textfield',
                fieldLabel: '任务书号',
                name: 'WEAVNO',
                readOnly: true,
                value: weavNo
            },
            {
                xtype: 'textfield',
                fieldLabel: '缸号',
                name: 'SUBBATCHNO',
                value: SUBBATCHNO
            },
            StartSerialNoCmb, EndSerialNoCmb
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {
                    SUBBATCHNO = form.getForm().findField('SUBBATCHNO').getValue();
                    var StartValue = form.getForm().findField('StartSerialNo').getValue();
                    var EndValue = form.getForm().findField('EndSerialNo').getValue();

                    Ext.Ajax.request({
                        url: 'api/planmanagement/BatchModifySubbacthNo',
                        jsonData: {
                            billNo: billNo, SUBBATCHNO: SUBBATCHNO, StartValue: StartValue, EndValue: EndValue
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            result = Ext.decode(response.responseText);
                            if (result.Success) {
                                Commonfunc();
                                Ext.Msg.alert("提示", "操作成功！");
                                win.close(this);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    })
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "批量修改缸号",       //标题
        draggable: false,
        height: 260,                          //高度
        width: 400,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}
//#endregion

//打印外购单
var printClaimant3 = Ext.create(Ext.Action, {
    text: '打印质量事故单',
    //iconCls: 'fa fa-download',
    /*            hidden: contains(permissionList, 6666, false, 'printTwistOrder', defineItems),*/
    handler: function () {
        var batchParams = "";
        var records = gridPanel.getView().getSelectionModel().getSelection();
        if (records.length == 1) {
            var records = gridPanel.getView().getSelectionModel().getSelection();
            if (records.length > 0) {
                for (var i = 0; i < records.length; i++) {
                    batchParams = records[i].get("SheetId");
                }
            }

            Ext.Msg.confirm("系统提示", "确定要打印吗？", function (btn) {
                if (btn == "yes") {
                    call.apply(this);
                    function call() {
                        Ext.Ajax.request({
                            url: '/api/materialmanagement/PrintClaimant3',
                            jsonData: { BILLNO: batchParams },
                            method: 'POST',
                            async: false,
                            timeout: 90000000,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if (result.Message != null) {
                                    Ext.Msg.alert("提示", result.Message);
                                    getBillListing();
                                }
                                else {
                                    var fileName = result;
                                    if (fileName && fileName !== '') {
                                        DesktopApp.IgnoreSkip = true;
                                        try {
                                            window.location.href = '/TempData/ExportData/' + GetCurrentDate() + '/' + fileName;
                                        } finally {
                                            DesktopApp.IgnoreSkip = false
                                        }
                                    }
                                }
                            },
                            failure: function (response) {
                                Ext.Msg.alert("提示", "方法调用失败");
                            }
                        });
                    }
                }
            });
        }
        else if (records.length == 0) {
            Ext.Msg.alert("提示", "未选择数据");
        }
        else { Ext.Msg.alert("提示", "只能单选打印"); }
    }
});


//#region 选择打印机并打印大标签
/**
 * 选择打印机并打印大标签
 * @param {any} barCodeList 选中的条码号
 * @param {any} typeId 1:流水号 2：条码号
 */
function SelectPrintAndPrintBarCode(barCodeList, typeId) {

    var printData = [];
    //#region 获取打印机
    Ext.Ajax.request({
        url: 'api/printlabel/getprinter',
        jsonData: {},
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Enttity != null && result.Enttity.length > 0) {
                for (var i = 0; i < result.Enttity.length; i++) {
                    var info = result.Enttity[i];
                    printData.push([info.Key, info.Value]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "获取打印机的方法调用失败");
        }
    });
    //#endregion

    var tranQualityCmb = new Ext.form.ComboBox({
        editable: false,
        triggerAction: 'all',
        fieldLabel: '<font color="red">*</font>打印机',
        store: printData,
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'type',
        mode: 'local',
        anchor: '90%',
        value: '',
        allowBlank: false
    });

    tranQualityCmb.setValue(printData[0]);

    var okbtn = new Ext.Button({
        text: '确定',
        class: 'fa fa-file-zip-o',
        handler: function () {

            var printId = tranQualityCmb.getValue();

            for (var i = 0; i < barCodeList.length; i++) {
                bigLabelPrint(barCodeList[i], typeId, printId)
            }

            insert_Win.close();
        }
    });

    var insert_Win = new Ext.Window({
        plain: true,
        layout: 'form',
        resizable: false, // 改变大小
        draggable: true, // 不允许拖动
        closeAction: 'hide',// 可被关闭 close or hide
        modal: true, // 模态窗口
        width: 400,
        height: 200,
        title: '选择打印机',
        items: [tranQualityCmb],
        autoScroll: true,
        buttonAlign: 'center',
        loadMask: true,
        bbar: [okbtn]
    });
    insert_Win.show();
}
//#endregion

/**
 * 打印流水号通用类
 * @param {any} serialNoList 选中的流水号
 * @param {any} billNo  单据编号
 * @param {any} progId  单据的progId
 */
function printSerialNoCommon(serialNoList, billNo, progId) {
    var msg = "确定要打印吗？";
    Ext.Msg.confirm("系统提示", msg, function (btn) {
        if (btn == "yes") {
            Ext.Ajax.request({
                url: '/api/common/printserialno',
                jsonData: { progId: progId, paramValue: serialNoList, commonField: billNo },
                method: 'POST',
                async: false,
                timeout: 90000000,
                success: function (response) {
                    var result = Ext.decode(response.responseText);

                    var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                    var printhtml = "";

                    //LODOP.PRINT_INITA(0, 0, "100%", "100%", "打印控件功能演示_Ext");
                    var index = 0;
                    for (var i = 0; i < result.length; i++) {
                        for (var count = 0; count < 2; count++) {
                            var row2AfterFlag = false;
                            var signName = result[i].WEAVDEVICEID == "" ? "" : result[i].WEAVDEVICEID;
                            signName = signName == "" ? result[i].SUPPLIERNAME : signName + "/" + result[i].SUPPLIERNAME;

                            printhtml += "<table border=0 cellpadding = 0 cellspacing = 0 >";
                            var printhtml_temp = "";
                            printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "产品型号：" + result[i].PRODUCTID);
                            printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "订单号：" + result[i].ORDERID);
                            if (progId == "stk.HalfDyeStockIn") {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "缸号：" + result[i].SUBBATCHNO);
                            }
                            else {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "订单数量：" + result[i].ORDERNum);
                            }
                            if (progId == "pls.Outsourcing") {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "外购户：" + result[i].SupplierId);
                            }
                            else if (progId == "stk.HalfDyeStockIn") {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "后处理厂：" + result[i].SupplierId);
                            }
                            else if (progId == "qc.ProductCut") {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "缸号：" + result[i].SUBBATCHNO);
                            }
                            else {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "机台：" + signName);
                            }
                            printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "卷号：" + result[i].ROLLNUM + " - " + result[i].ROWNO);
                            if (progId == "pls.Outsourcing") {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "外购单号：" + result[i].PlsOutsourcingNo);
                            }
                            else if (progId == "stk.HalfDyeStockIn") {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "染色单号：" + result[i].PlsOutsourcingNo);
                            }
                            else {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "任务书：" + result[i].WEAVNO);
                            }

                            printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "订单门幅：" + result[i].GATEWIDTH + " cm");
                            var AFTERWAYROUTENAME = result[i].AFTERWAYROUTENAME;
                            var AFTERWAYROUTENAME_1 = "";
                            var AFTERWAYROUTENAME_2 = "";
                            var AFTERWAYROUTENAMELength = 9;
                            if (AFTERWAYROUTENAME.length > AFTERWAYROUTENAMELength) {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '10px', "后整理：" + AFTERWAYROUTENAME);
                                //row2AfterFlag = true;
                                //AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME.substring(0, AFTERWAYROUTENAMELength);
                                //AFTERWAYROUTENAME_2 = AFTERWAYROUTENAME.substring(AFTERWAYROUTENAMELength);
                            }
                            else {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "后整理：" + AFTERWAYROUTENAME);
                            }
                            //else {
                            //    AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME;
                            //}
        /*                    printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "后整理：" + AFTERWAYROUTENAME_1);*/
                            //if (AFTERWAYROUTENAME_2.length > 0) {
                            //    printhtml_temp += SetPrintTR('6mm', 'left', '', '14px', "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p;" + AFTERWAYROUTENAME_2);
                            //}
                            if (progId == "stk.HalfDyeStockIn" || progId == "qc.ProductCut" ) {
                          /*      printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "缸号：" + result[i].SUBBATCHNO);*/
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "收回米数：" + result[i].ProductQuantity);
                            }
                            else {
                                printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "缸号：" + result[i].SUBBATCHNO);
                            }
                            printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "检验米数：");
                            printhtml_temp += SetPrintTR('6mm', 'left', '', '15px', "检验员：");
                            printhtml_temp += SetPrintTR('6mm', 'left', 'padding-left:10px; padding-top:10px;', '30px', result[i].SERIALNO);
                            printhtml_temp += SetPrintTR('mm', 'left', 'padding-left:10pt;', '15px', "<img src='" + result[i].BARCODE + "'>");
                            printhtml_temp += SetPrintTR('4mm', 'left', 'padding-left:10pt;', '15px', "");
                            printhtml_temp += SetPrintTR('2mm', 'left', '', '15px', "&nbsp;&nbsp;甲：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙：");
                            printhtml_temp += SetPrintTR('2mm', 'left', '', '15px', "");
                            printhtml_temp += SetPrintTR('2mm', 'left', '', '15px', "------------------------------------");

                            //if (row2AfterFlag) {
                            //    printhtml += SetPrintTR('5mm', 'left', '', '15px', "");
                            //    printhtml += printhtml_temp;
                            //    printhtml += SetPrintTR('3mm', 'left', '', '15px', "");
                            //}
                            //else {
                                printhtml += SetPrintTR('6mm', 'left', '', '15px', "");
                                printhtml += printhtml_temp;
                                printhtml += SetPrintTR('1mm', 'left', '', '15px', "");
                        /*    }*/
                            printhtml += "</table >";
                            index++;
                        }
                    }

                    LODOP.ADD_PRINT_HTM(0, 35, "100%", "100%", printhtml);

                    var index2 = 0;
                    //for (var i = 0; i < result.length; i++) {
                    //    for (var count = 0; count < 2; count++) {
                    //        var row2AfterFlag = false;
                    //        var AFTERWAYROUTENAME_1 = "";
                    //        var AFTERWAYROUTENAME_2 = "";
                    //        var AFTERWAYROUTENAMELength = 9;
                    //        if (AFTERWAYROUTENAME.length > AFTERWAYROUTENAMELength) {
                    //            row2AfterFlag = true;
                    //            AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME.substring(0, AFTERWAYROUTENAMELength);
                    //            AFTERWAYROUTENAME_2 = AFTERWAYROUTENAME.substring(AFTERWAYROUTENAMELength);
                    //        }
                    //        else {
                    //            AFTERWAYROUTENAME_1 = AFTERWAYROUTENAME;
                    //        }
                    //        if (row2AfterFlag) {
                    //            printhtml += SetPrintTR('5mm', 'left', '', '15px', "");
                    //            printhtml += printhtml_temp;
                    //            printhtml += SetPrintTR('3mm', 'left', '', '15px', "");
                    //            LODOP.ADD_PRINT_BARCODE(90 + (index2 * 123.83) + 'mm', '9mm', '120px', '35px', '128Auto', result[i].SERIALNO);
                    //            LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
                    //        }
                    //        else {
                    //            printhtml += SetPrintTR('8mm', 'left', '', '15px', "");
                    //            printhtml += printhtml_temp;
                    //            printhtml += SetPrintTR('6mm', 'left', '', '15px', "");
                    //            LODOP.ADD_PRINT_BARCODE(87 + (index2 * 123.83) + 'mm', '9mm', '120px', '35px', '128Auto', result[i].SERIALNO);
                    //            LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
                    //        }
                    //        index2++;
                    //    }
                    //}
                    LODOP.SET_PRINT_PAGESIZE(1, 650, 1120);
                    LODOP.SET_PRINT_STYLEA(0, "TableRowThickNess", 25);

                    LODOP.PREVIEW();
                    //window.document.body.innerHTML = printhtml;
                    //window.print();   
                },
                failure: function (response) {
                    Ext.Msg.alert("提示", "方法调用失败");
                }
            });
        }
    });
}

//#region 选择半成品检验员（待修补处理）
/**
 * 选择半成品检验员（待修补处理）
 * @param {any} serialNoList 选中的流水号
 */
function SelectHalfCheckPerson(serialNoList, objThis, func) {

    var printData = [];
    //#region 获取半成品检验员信息
    Ext.Ajax.request({
        url: 'api/qccheckfinishproduct/GetGroupCheckPerson',
        jsonData: { paramValue: 5 },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            printData.push(["", "请选择"]);
            if (result != null && result.Entities != null && result.Entities.length > 0) {
                for (var i = 0; i < result.Entities.length; i++) {
                    var info = result.Entities[i];
                    printData.push([info.PersonId, info.PersonName]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "获取检验员的方法调用失败");
        }
    });
    //#endregion

    var tranQualityCmb = new Ext.form.ComboBox({
        editable: false,
        triggerAction: 'all',
        fieldLabel: '<font color="red">*</font>检验员',
        store: printData,
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'type',
        mode: 'local',
        anchor: '90%',
        value: '',
        allowBlank: false
    });

    //var tranDateTime = {
    //    //id: "tranDate",
    //    fieldLabel: '<font color="red">*</font>修补日期',
    //    xtype: 'datefield',
    //    width: 240,
    //    labelSeparator: ':',
    //    msgTarget: 'side',//提示信息显示在字段的右边
    //    autoFitErrors: false,//展示错误信息时是否调整字段组件的宽度
    //    format: 'Y年m月d日',//显示日起的格式
    //};



    tranQualityCmb.setValue(printData[0]);

    var okbtn = new Ext.Button({
        text: '确定',
        class: 'fa fa-file-zip-o',
        handler: function () {

            var personId = tranQualityCmb.getValue();
            var personName = tranQualityCmb.getRawValue();
            //alert(tranDateTime.getValue());
            //var vTime = Ext.getCmp("tranDate").getValue();
            //var vTime = 0;
            //const year = vTime.getFullYear();
            //const month = ('0' + (vTime.getMonth() + 1)).slice(-2);
            //const day = ('0' + vTime.getDate()).slice(-2);
            //var handleDate = (year + month + day);
            var handleDate = 0;
            if (personId == "") {
                Ext.Msg.alert("提示", "请选择检验员");
            }
            else {
                var loginPersonId = Ext.util.Cookies.get("loginPersonId");
                var url = "api/qchalfproduct/HandleRepairProduct";
                Ext.Ajax.request({
                    url: url,
                    jsonData: {
                        serialNoList: serialNoList, personId: personId, personName: personName, createUserId: loginPersonId, handleDate: handleDate
                    },
                    method: 'POST',
                    async: false,
                    timeout: 90000000,
                    success: function (response) {
                        result = Ext.decode(response.responseText);
                        Ext.Msg.alert("提示", result.Message);
                    },
                    failure: function (response) {
                        Ext.Msg.alert("提示", "获取检验员的方法调用失败");
                    }
                });
                insert_Win.close();
                if (func != null) {
                    func(objThis);
                }
            }
        }
    });

    var insert_Win = new Ext.Window({
        plain: true,
        layout: 'form',
        resizable: false, // 改变大小
        draggable: true, // 不允许拖动
        closeAction: 'hide',// 可被关闭 close or hide
        modal: true, // 模态窗口
        width: 400,
        height: 200,
        title: '选择检验员',
        items: [tranQualityCmb,
            //tranDateTime
        ],
        autoScroll: true,
        buttonAlign: 'center',
        loadMask: true,
        bbar: [okbtn]
    });
    insert_Win.show();
}
//#endregion

//#region 导出码单
/**
 * 导出码单
 * @param {any} billNOs 选中的单据
 * @param {any} progId 选中的单据
 * @param {any} Commonfunc 成功后调用
 */
function ExportCodeFunc(sheetIds, progId, Commonfunc) {

    var CodeFormatData = [
        [0, "Art码单格式"],
        [1, "Maya码单格式"],
        [2, "PCTG格式码单"],
        [3, "航安码单格式"],
        [4, "磨根码单格式"],
        [5, "上海卓饰的指定码单格式"]
    ];

    var CodeFormatCmb = new Ext.form.ComboBox({
        editable: true,
        triggerAction: 'all',
        fieldLabel: '码单格式',
        displayField: 'value',//显示下拉列表数据值
        valueField: 'value', //提交时下拉列表框的数据值
        name: 'CodeFormat',
        mode: 'local',
        anchor: '100%',
        width: 60,
        allowBlank: false,
        //lazyInit="false",
        store: {
            fields: ['id', "value"],
            data: CodeFormatData
        },
        queryDelay: 500,//查询延时，毫秒
        listeners: {
            'beforequery': function (e) {
                var combo = this,
                    size = 15,
                    idx = 1;
                combo.expand();
                if (e.query === '' || e.query == null) {//当输入框删除内容后，清除过滤器，
                    //显示原本store数据,使其能够再次检索
                    combo.store.clearFilter();
                }
                else {
                    if (!e.forceAll) {
                        var input = e.query;
                        // 检索的正则
                        var regExp = new RegExp(".*" + input + ".*", "i");
                        // 执行检索
                        combo.store.filterBy(function (record, id) {
                            //if (idx > size) {
                            //    return false;
                            //}
                            var text = record.get(combo.displayField);
                            var flag = regExp.test(text);
                            if (flag) {
                                idx++;
                            }
                            return flag;
                        });
                        return false;
                    }
                }
            }
        }
    })
    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            CodeFormatCmb
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {
                    var CodeFormat = form.getForm().findField("CodeFormat").getValue();

                    Ext.Ajax.request({
                        url: 'api/goodstraffic/ExportCodeFunc',
                        jsonData: {
                            SheetIds: sheetIds, CodeFormat: CodeFormat, ProgId: progId
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            result = Ext.decode(response.responseText);
                            if (result.Success) {
                                if (Commonfunc != null) {
                                    Commonfunc();
                                }

                                var fileName = result.Enttity;
                                if (fileName && fileName !== '') {
                                    DesktopApp.IgnoreSkip = true;
                                    try {
                                        window.location.href = '/TempData/GoodsTraffic/' + fileName;
                                    } finally {
                                        DesktopApp.IgnoreSkip = false
                                    }
                                }
                                win.close(this);
                            }
                            else {
                                Ext.Msg.alert("提示", result.Message);
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    })
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "导出码单",       //标题
        draggable: false,
        height: 120,                          //高度
        width: 300,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}
//#endregion


//弹出页面
/**
 * 点击弹出页面
 * @param {any} type 类型（1：销售订单，2：产品型号）
 * @param {any} param 参数
 */
var showPageFuncInfo = function (type, param) {
    if (type == 1) {
        Ax.utils.LibVclSystemUtils.openDataFunc("sal.OrderShowFunc", "订单信息", [this, param]);
    }
    else if (type == 2) {
        Ext.Ajax.request({
            url: 'api/DsProduct/IsExistProductId',
            jsonData: {
                paramValue: param
            },
            method: 'POST',
            async: false,
            timeout: 90000000,
            success: function (response) {
                result = Ext.decode(response.responseText);
                if (result.Success) {
                    Ax.utils.LibVclSystemUtils.openBill("ds.Product", BillTypeEnum.Master, "产品工艺", BillActionEnum.Browse, undefined, [param], null, true);
                }
                else {
                    Ext.Msg.alert("提示", "该产品工艺未创建");
                }
            },
            failure: function (response) {
                Ext.Msg.alert("提示", "方法调用失败");
            }
        })

    }
}

//弹出页面
/**
 * 点击弹出页面
 * @param {any} type 类型（1：销售订单，2：产品型号）
 * @param {any} param 参数
 */
var showProductPageFuncInfo = function (param) {
    Ext.Ajax.request({
        url: 'api/DsProduct/IsExistProductId',
        jsonData: {
            paramValue: param
        },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result.Success) {
                Ax.utils.LibVclSystemUtils.openDataFunc("ds.ProductInfoFunc", "产品工艺", [this, param]);
            }
            else {
                Ext.Msg.alert("提示", "该产品工艺未创建");
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    })
}

//#region 导出码单
/**
 * 导出码单
 * @param {any} billNOs 选中的单据
 * @param {any} progId 选中的单据
 * @param {any} Commonfunc 成功后调用
 */
function HalfProductChangeFunc(batchParams, htmlVlaue, UserHandle, personId) {
    var form = Ext.create('Ext.form.Panel', {
        bodyPadding: 5,
        width: 330,
        renderTo: Ext.getBody(),
        layout: 'anchor',  // 使用anchor布局来允许组件填充可用空间
        autoScroll: true, // 启用滚动条
        defaults: {
            anchor: '95%',  // 默认所有组件占满宽度
            labelAlign: 'left'  // 所有标签左对齐
        },
        items: [{
            xtype: 'label',
            html: htmlVlaue,
            style: {
                display: 'block',
                marginBottom: '10px'  // 底部外边距以分隔行
            }
        },
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',  // 使用hbox布局来水平排列标签和输入框
            items: [{
                xtype: 'label',
                text: '新产品型号：',
                margin: '0 5 0 0'  // 右侧外边距以分隔标签和输入框
            }, {
                xtype: 'textfield',
                name: 'newProductId',
                flex: 1  // 使用flex属性来允许输入框填充剩余空间
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',  // 使用hbox布局来水平排列标签和输入框
            items: [{
                xtype: 'label',
                text: '备　　　注：',
                margin: '0 5 0 0'  // 右侧外边距以分隔标签和输入框
            }, {
                xtype: 'textfield',
                name: 'remarks',
                flex: 1  // 使用flex属性来允许输入框填充剩余空间
            }]
        }
        ],
        style: {
            'overflow-x': 'hidden',
            'font-weight': '500'
        },
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {
                    var newProductId = form.getForm().findField("newProductId").getValue();
                    var remarks = form.getForm().findField("remarks").getValue();
                    Ext.Ajax.request({
                        url: '/api/halfproductmanagement/ChangeProductId',
                        jsonData: {
                            handle: UserHandle,
                            newProductId: newProductId,
                            remarks: remarks,
                            batchParams: batchParams,
                            personId: personId
                        },
                        method: 'POST',
                        async: false,
                        timeout: 90000000,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result.Message != null) {
                                Ext.Msg.alert("提示", result.Message);
                                if (result.Success) {
                                    win.close(this);
                                }
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert("提示", "方法调用失败");
                        }
                    });
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });

    //var form = new Ext.FormPanel({
    //    //labelAlign: 'top',
    //    bodyStyle: 'padding:5px 5px 0',
    //    layout: 'form',
    //    items: [
    //        {
    //            xtype: 'displayfield',
    //            layout: 'hbox',
    //            value: htmlVlaue,
    //            columnWidth: 1
    //        },
    //        {
    //                xtype: 'textfield',
    //                name: 'input1',
    //                fieldLabel: '新产品型号',
    //                allowBlank: false
    //            }, {
    //                xtype: 'textfield',
    //                name: 'input2',
    //                fieldLabel: '备注',
    //                allowBlank: false
    //            }],
    //    buttonAlign: 'center',
    //    buttons: [
    //        {
    //            text: '保存',
    //            handler: function () {
    //                var CodeFormat = form.getForm().findField("CodeFormat").getValue();
    //                Commonfunc();

    //            }
    //        }, {
    //            text: '关闭',
    //            handler: function () {
    //                win.close(this);
    //            }
    //        }
    //    ]
    //});
    var win = Ext.create("Ext.window.Window", {
        title: "产品型号转换",       //标题
        draggable: false,
        height: 380,                          //高度
        width: 350,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,

        items: [form]
    });
    win.show();
}
//#endregion

//#region 选择后整理路线(修改后整理方式)
/**
 * 选择后整理路线(修改后整理方式)
 * @param {any} Commonfunc 成功后调用
 */
function SelectAfterWayRoute_Com(Commonfunc) {

    var AfterWayRouteClassData = [];
    //#region 后整理路线
    Ext.Ajax.request({
        url: 'api/afterwaymanagement/getafterwayfulldata',
        jsonData: { paramValue: "" },
        method: 'POST',
        async: false,
        timeout: 90000000,
        success: function (response) {
            result = Ext.decode(response.responseText);
            if (result != null && result.Total > 0) {
                for (var i = 0; i < result.Total; i++) {
                    var info = result.Entities[i];
                    AfterWayRouteClassData.push([info.AFTERWAYROUTEID, info.AFTERWAYROUTEID + ',' + info.AFTERWAYROUTENAME]);
                }
            }
        },
        failure: function (response) {
            Ext.Msg.alert("提示", "方法调用失败");
        }
    });
    //#endregion

    var AfterWayRouteCmb = new Ext.form.ComboBox({
        editable: true,
        triggerAction: 'all',
        fieldLabel: '后整理路线',
        displayField: 'value',//显示下拉列表数据值
        valueField: 'id', //提交时下拉列表框的数据值
        name: 'AFTERWAYROUTEID',
        mode: 'local',
        anchor: '100%',
        width: 300,
        allowBlank: false,
        //lazyInit="false",
        store: {
            fields: ['id', 'value'],
            data: AfterWayRouteClassData
        },
        queryDelay: 500,//查询延时，毫秒
        listeners: {
            'beforequery': function (e) {
                var combo = this,
                    size = 15,
                    idx = 1;
                combo.expand();
                if (e.query === '' || e.query == null) {//当输入框删除内容后，清除过滤器，
                    //显示原本store数据,使其能够再次检索
                    combo.store.clearFilter();
                }
                else {
                    if (!e.forceAll) {
                        combo.store.clearFilter();
                        var input = e.query;
                        // 检索的正则
                        var regExp = new RegExp(".*" + input + ".*", "i");
                        // 执行检索
                        combo.store.filterBy(function (record, id) {
                            //if (idx > size) {
                            //    return false;
                            //}
                            var text = record.get(combo.displayField);
                            var flag = regExp.test(text);
                            if (flag) {
                                idx++;
                            }
                            return flag;
                        });
                        return false;
                    }
                }
            }
        }
    })
    var form = new Ext.FormPanel({
        //labelAlign: 'top',
        bodyStyle: 'padding:5px 5px 0',
        layout: 'form',
        items: [
            AfterWayRouteCmb
        ],
        buttonAlign: 'center',
        buttons: [
            {
                text: '保存',
                handler: function () {
                    var AFTERWAYROUTEID = form.getForm().findField("AFTERWAYROUTEID").getValue();

                    var AFTERWAYROUTENAME = form.getForm().findField('AFTERWAYROUTEID').getRawValue().replace(AFTERWAYROUTEID + ",", "");
                    Commonfunc(AFTERWAYROUTEID, AFTERWAYROUTENAME);
                }
            }, {
                text: '关闭',
                handler: function () {
                    win.close(this);
                }
            }
        ]
    });
    var win = Ext.create("Ext.window.Window", {
        title: "选择后整理方式",       //标题
        draggable: false,
        height: 120,                          //高度
        width: 430,                           //宽度
        layout: "fit",                        //窗口布局类型
        modal: true, //是否模态窗口，默认为false
        resizable: false,
        items: [form]
    });
    win.show();
}

/**
 * 根据客户和产品型号得到下单信息
 * @param {any} customerId 客户编码
 * @param {any} productId  产品型号
 */
function GetDEFECT(CHECKID, WORKERSUSERSID) {
    var url = 'api/qccheckfinishproduct/GetEfect';
    var filedWidth = [
        { filed: "DEFECTNAME", width: 200 }
    ];
    var jsonQuery = {
        CHECKID: CHECKID,
        WORKERSUSERSID: WORKERSUSERSID,
    };
    CreateNewExtWin(url, filedWidth, jsonQuery, '缺陷信息', GetHelfProductDEFECTInfoFunc, 120);
}


/**
* 调拨数据合计
* @param {Array}storeData 数据列表
*/
function GetHelfProductDEFECTInfoFunc(storeData) {
    var SUBTRACTNUM = 0;
    var DEFECTLENGTH = 0;
    $.each(storeData, function (i, item) {
        SUBTRACTNUM = (parseFloat(SUBTRACTNUM) + parseFloat(item.SUBTRACTNUM)).toFixed(1);
        DEFECTLENGTH = (parseFloat(DEFECTLENGTH) + parseFloat(item.DEFECTLENGTH)).toFixed(1);
    });

    return "合计：扣分：" + SUBTRACTNUM + ",缺陷米数：" + DEFECTLENGTH;
}
//#endregion

//#endregion 独立函数 代码结束
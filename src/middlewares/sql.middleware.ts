import { NextFunction, Request, Response } from "express";
import { warnLogger } from "./logger.middleware";

function hasSQLInjection(input: any): boolean {
    const sqlInjectionPatterns = [
      /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
      /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  
      /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
      /((\%27)|(\'))union/i,
      /((\%27)|(\'))select/i,
  
      /((\%3B)|(;))/i,
  
      /((\%2D)|(-)){2}/i,
  
      /((\%27)|(\'))0x[0-9a-fA-F]*/i,
  
      /(exec|xp_cmdshell|response\.write)/i,
  
      /(waitfor\s+delay|benchmark|pg_sleep|sleep)/i,
  
      /((\%27)|(\'))\s*(or|and)\s*((\%27)|(\'))/i,
      /(drop(\s+)?table|show(\s+)?tables|--|declare|truncate|delete|update|remove)/i, // e.g., DROP TABLE
    ];
    for (let pattern of sqlInjectionPatterns) {
      if (pattern.test(input)) {
        return true;
      }
    }
    return false;
  }
export function sqlInjectionDetector(req: Request, res: Response, next: NextFunction): any {
    const queryParams = Object.values(req.query);
    const bodyParams = Object.values(req.body);
    for (let param of [...queryParams, ...bodyParams]) {
      if (hasSQLInjection(param)) {
        warnLogger.warn(`SQL Injection detected in parameter: ${param}`);
        return res.status(400).json({
          message: "Potential SQL Injection detected.",
        });
      }
    }
    next();
  }


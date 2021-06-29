<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
class BackupController extends Controller
{
    public function getBackup(){
        $backups = DB::table('backups')->select('id_backup','name_backup','path','date')->get();
        return $backups;
    }
    public function restore(Request $request){

//        $filename = "backup-" . Carbon::now()->format('Y-m-d') . ".sql";
        // $host = config('database.connections.mysql.host');
        // $username = config('database.connections.mysql.username');
        // $password = config('database.connections.mysql.password');
        // $database = config('database.connections.mysql.database');
        $host = config('DB_HOST');
        $username = config('DB_USERNAME');
        $password = config('DB_PASSWORD');
        $database = config('DB_DATABASE');
        exec("mysql -h {$host} -u {$username} -p{$password} {$database}". "  < " . $request->routePath);

    }
}

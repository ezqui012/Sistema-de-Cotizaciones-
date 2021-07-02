<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
class BackupDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'database:backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $filename = "backup--1" . Carbon::now()->format('Y-m-d') . ".sql";
        $now = Carbon::now();
        $host = config('database.connections.mysql.host');
        $username = config('database.connections.mysql.username');
        $password = config('database.connections.mysql.password');
        $database = config('database.connections.mysql.database');
        exec("mysqldump -h {$host} -u {$username} -p{$password} {$database} --ignore-table=bdcoti.backups". "  > " . "G:/Proyectocotizacion/Backe-end/storage/app/backups/".$filename);
        DB::table('backups')->insert([
            'name_backup'=> 'Backup'.$now->format('Y-m-d'),
            'path'=> 'G:/Proyectocotizacion/Backe-end/storage/app/backups/'.$filename,
            'date'=> $now->format('Y-m-d')
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::statement("SET foreign_key_checks = 0");


        \CodeProject\Entities\ProjectMember::truncate();
        \CodeProject\Entities\ProjectTask::truncate();
        \CodeProject\Entities\ProjectNote::truncate();
        \CodeProject\Entities\Project::truncate();
        \CodeProject\Entities\Client::truncate();
        \CodeProject\Entities\User::truncate();

        DB::table('oauth_clients')->delete();

        $this->call(UserTableSeeder::class);
        $this->call(ClientTableSeeder::class);
        $this->call(ProjectTableSeeder::class);
        $this->call(ProjectNoteTableSeeder::class);
        $this->call(ProjectTaskTableSeeder::class);
        $this->call(ProjectMemberTableSeeder::class);
        $this->call(OAuthClientSeeder::class);

        
        Model::reguard();
    }
}
